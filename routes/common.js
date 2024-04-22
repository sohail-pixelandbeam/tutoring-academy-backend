const {
    updateRecord,
    getAllRecords,
    createRecord,
    deleteRecord }
    = require("../controllers/common");
const {
    express,
    parser,
} = require('../modules');
const COMMON_ROUTERS = express.Router();

COMMON_ROUTERS.put('/:table/:id', parser, updateRecord)

COMMON_ROUTERS.get('/:table/list', getAllRecords)
COMMON_ROUTERS.post('/:table', parser, createRecord)
COMMON_ROUTERS.delete('/:table/:id', parser, deleteRecord)



module.exports = COMMON_ROUTERS