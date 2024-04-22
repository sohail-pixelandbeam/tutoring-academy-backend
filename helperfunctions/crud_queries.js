const insert = (tableName, values) => {
    let fieldsArray = Object.keys(values);
    const valuesArray = Object.keys(values).map(key => {
        return values[key];
    })

    const fieldsMapped = fieldsArray.map((field, index) => {
        return ((fieldsArray.length !== index) ? `${field}` : `${field}`)
    })

    const queryFieldsPart = `(` + fieldsMapped + `)`;
    const valuesMapped = valuesArray.map((value, index) => {
        const updatedArray = ((valuesArray.length !== index) ? `${typeof (value) === 'object' ? `'${JSON.stringify(value)}'` : `'${value}'`}` : `'${value}'`);
        return updatedArray
    })

    const queryValuesPart = `(` + valuesMapped + `)`;

    const query = `INSERT INTO ${tableName} ${fieldsArray.length ? queryFieldsPart : null} OUTPUT inserted.* VALUES ${queryValuesPart}`;
    // console.log(query)
    return query
}

/**
 * 
 * @param {String} tableName 
 * @param {{}} values key value to update the table fields
 * @param {{}} where keys values for where [key] = [value]
 * @param {true} returnUpdated retuen updated value or not
 * @returns 
 */
const update = (tableName, values, where, casting = {}, returnUpdated = true) => {
    const updateFieldsArray = Object.keys(values);

    const setClause = updateFieldsArray.map((field, index) => {
        const updatedValue = typeof values[field] === 'object'
            ? `'${JSON.stringify(values[field])}'`
            : `'${values[field]}'`;
        return `${field} = ${updatedValue}`;
    }).join(', ');

    const whereFieldsArray = Object.keys(where);
    const whereClause = whereFieldsArray.map((field, index) => {
        const whereValue = typeof where[field] === 'object'
            ? `'${JSON.stringify(where[field])}'`
            : `'${where[field]}'`;
        const fieldCasting = casting[field] || '';
        return `${casting[field] ? `CAST(${field} AS ${fieldCasting})` : `${field}`} = ${whereValue}`;
    }).join(' AND ');

    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause};
    ${returnUpdated ? `SELECT * FROM  ${tableName}  WHERE  ${whereClause};` : ``}
    `;
    console.log(query)
    return query;
};


const parameteriedUpdateQuery = (tableName, values, where, returnUpdated = true) => {
    const updateFieldsArray = Object.keys(values);
    const setClause = updateFieldsArray.map((field) => {
        return `${field} = @${field}`;
    }).join(', ');

    const whereFieldsArray = Object.keys(where);
    const whereClause = whereFieldsArray.map((field) => {
        return `${field} = @${field}`;
    }).join(' AND ');

    const parameterizedValues = { ...values, ...where };

    const parameterizedQuery = `
        UPDATE ${tableName} SET ${setClause} WHERE ${whereClause};
        ${returnUpdated ? `SELECT * FROM ${tableName} WHERE ${whereClause};` : ``}
        `;

    console.log(parameterizedQuery);
    return { query: parameterizedQuery, values: parameterizedValues };
};

const parameterizedInsertQuery = (tableName, values) => {
    const fieldsArray = Object.keys(values);
    const valuesArray = Object.keys(values).map(key => values[key]);

    const valuePlaceholders = fieldsArray.map(field => `@${field}`).join(', ');

    const query = `
        INSERT INTO ${tableName} ${fieldsArray.length ? `(${fieldsArray.join(', ')})` : ''}
        OUTPUT inserted.*
        VALUES (${valuePlaceholders});
    `;

    const parameterizedValues = { ...values, value: valuesArray };

    console.log(query);
    return { query, values: parameterizedValues };
};


const updateById = (id, tableName, fields) => {
    const { disableDates, disableWeekDays, disableHourSlots, enableHourSlots, disableHoursRange, enabledDays, disableColor } = fields;
    const query = `UPDATE ${tableName}
        SET disableDates = '${JSON.stringify(disableDates)}',
        disableWeekDays = '${JSON.stringify(disableWeekDays)}',
        disableHourSlots =  '${JSON.stringify(disableHourSlots)}', 
        enableHourSlots =' ${JSON.stringify(enableHourSlots)}',
        disableHoursRange='${JSON.stringify(disableHoursRange)}',
        enabledDays='${JSON.stringify(enabledDays)}',
        disableColor='${disableColor}'
        WHERE CONVERT(VARCHAR, AcademyId)  = '${id}';`
    return query;
}

const getAll = (tableName) => {
    const query = `SELECT * FROM ${tableName}`;
    // console.log(query)
    return query;
}

/**
 * 
 * @param {String} tableName 
 * @param {{}} condition object, key=column name, values= value against it
 * @param {String} casting string -> cast 1 column taht is presrnt in condition
 * @returns String => Query
 */
const findByAnyIdColumn = (tableName, condition, casting = null) => {
    let idColumn = Object.keys(condition)[0];
    let value = `'${condition[idColumn]}'`;
    if (casting && value) {
        idColumn = `CAST(${idColumn} AS ${casting})`;
    }
    let query = `SELECT TOP 1 * FROM ${tableName} where ${idColumn} = ${value}`;
    console.log(query)
    return query;
}

/**
 * 
 * @param {String} tableName 
 * @param {{}} where 
 * @param {String} opr 
 * @param {{}} casting 
 * @returns  query
 */
const find = (tableName, where, opr = 'AND', casting = {}) => {
    const conditions = [];

    for (const key in where) {
        if (where.hasOwnProperty(key)) {
            const castType = casting[key];
            const column = castType ? `CAST(${key} AS ${castType})` : key;
            conditions.push(`${column} = '${where[key]}'`);
        }
    }

    const whereClause = conditions.join(` ${opr} `);
    const sql = `SELECT * FROM ${tableName} WHERE ${whereClause}`;
    console.log(sql);
    return sql;
};

module.exports = {
    insert,
    getAll,
    updateById,
    findByAnyIdColumn,
    update,
    parameteriedUpdateQuery,
    parameterizedInsertQuery,
    find
}

