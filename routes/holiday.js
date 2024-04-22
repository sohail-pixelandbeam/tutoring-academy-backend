const { getHolidays } = require("../controllers/holiday");
const { express } = require("../modules");

const HOLIDAY_ROUTES = express.Router();

HOLIDAY_ROUTES.get('/holiday/:code/:year/:month', getHolidays);


module.exports = HOLIDAY_ROUTES;

