const SchedulesController = require('../controllers/schedulesController');
const Middlewares = require("../middlewares/token");
const {Router} = require('express');
const router = Router();

router.get('/schedules', Middlewares.tokenValidade, SchedulesController.schedulesTest);
router.post('/schedules', Middlewares.tokenValidade, SchedulesController.createSchedule);



module.exports = router;