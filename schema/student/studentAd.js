const sql = require('mssql');

const studentAdsSchema = {
    Id: sql.Int,
    AcademyId: sql.VarChar(255),
    Create_At: sql.DateTime,
    AdText: sql.VarChar(sql.MAX),
    AdHeader: sql.VarChar(255),
    Subject: sql.VarChar(255),
    FacultyId: sql.Int,
    TutorCertificate: sql.VarChar(255),
    TutorExperience: sql.VarChar(50),
    TutorGMT: sql.VarChar(10),
    TutorEduLevel: sql.VarChar(50),
    TutorLanguages: sql.NVarChar(sql.MAX),
    Country: sql.VarChar(50),
    Language: sql.VarChar(50),
    Grade: sql.VarChar(50),
    GMT: sql.VarChar(10),
    Status: sql.VarChar(50),
    Published_At: sql.DateTime
};

module.exports = studentAdsSchema;
