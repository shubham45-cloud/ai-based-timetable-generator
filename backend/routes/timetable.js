const router = require("express").Router();
const {
  dashboardData,
  generateTimetable
} = require("../controllers/timetableController");

router.get("/dashboard", dashboardData);
router.post("/generate", generateTimetable);

module.exports = router;
