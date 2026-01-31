exports.dashboardData = (req, res) => {
  res.json({
    classes: 18,
    teachers: 25,
    subjects: 12,
    generated: 35
  });
};

exports.generateTimetable = (req, res) => {
  // AI logic later
  res.json({
    message: "Timetable generated successfully",
    conflictsResolved: 120,
    efficiency: "95%"
  });
};
