const SchedulesController = require("../controllers/schedulesController");
const Middlewares = require("../middlewares/token");
const { Router } = require("express");
const router = Router();

router.post(
  "/schedules",
  Middlewares.tokenValidade,
  SchedulesController.createSchedule
);
router.post(
  "/schedules/:id/themes",
  Middlewares.tokenValidade,
  SchedulesController.createScheduleTheme
);
router.get(
  "/schedules?",
  Middlewares.tokenValidade,
  SchedulesController.getSchedulesOfInstructor
);
router.patch(
  "/schedules/:id",
  Middlewares.tokenValidade,
  SchedulesController.updateASchedule
);
router.delete(
    "/schedules/:id/themes/:themeId",
    Middlewares.tokenValidade,
    SchedulesController.deleteScheduleTheme
  );
  

module.exports = router;
