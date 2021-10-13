const SchedulesController = require('../controllers/schedulesController');
const Middlewares = require("../middlewares/token");
const {Router} = require('express');
const router = Router();

router.post('/schedules', Middlewares.tokenValidade, SchedulesController.createSchedule);
router.get('/schedules?', Middlewares.tokenValidade, SchedulesController.getAllSchedules);
router.patch('/schedules/:id', Middlewares.tokenValidade, SchedulesController.updateASchedule);



module.exports = router;