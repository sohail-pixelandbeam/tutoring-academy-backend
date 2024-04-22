// const holiday = require('holiday');
const axios = require('axios');
const api_key = process.env.HOLIDAY_ABS_API_KEY;
const API_URL = 'https://holidays.abstractapi.com/v1';


const getHolidays = async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/?api_key=${api_key}&country=${req.params.code}&year=${req.params.year}&month=${req.params.month}&day=25`);
        res.status(200).send(response.data)
    } catch (error) {
        console.error('Error fetching holidays:', error.message);
        res.status(400).send(error.message)
    }
};

module.exports = {
    getHolidays,
};