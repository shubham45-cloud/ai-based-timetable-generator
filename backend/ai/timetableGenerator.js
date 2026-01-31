const data = require("../data/inputData");

function generateTimetable() {
  const timetable = {};

  data.classes.forEach(cls => {
    timetable[cls] = {};

    data.days.forEach(day => {
      timetable[cls][day] = [];

      let usedTeachers = new Set();

      for (let i = 0; i < data.periodsPerDay; i++) {
        let subject;

        do {
          subject =
            data.subjects[
              Math.floor(Math.random() * data.subjects.length)
            ];
        } while (usedTeachers.has(subject.teacher));

        usedTeachers.add(subject.teacher);
        timetable[cls][day].push(subject);
      }
    });
  });

  return timetable;
}

module.exports = generateTimetable;
