export function generateTimetableAI({
  teachers,
  rules,
  classes,
  days,
  periods,
}) {
  const timetable = {};
  const teacherLoad = {};

  classes.forEach((cls) => {
    timetable[cls] = {};

    days.forEach((day) => {
      timetable[cls][day] = [];

      periods.forEach(() => {
        const eligible = teachers.filter((t) => {
          teacherLoad[t.name] = teacherLoad[t.name] || 0;
          return teacherLoad[t.name] < rules.maxPeriodsPerTeacher;
        });

        if (eligible.length === 0) {
          timetable[cls][day].push({
            subject: "FREE",
            teacher: "-",
          });
          return;
        }

        const selected = eligible[Math.floor(Math.random() * eligible.length)];
        teacherLoad[selected.name]++;

        timetable[cls][day].push({
          subject: selected.subject,
          teacher: selected.name,
        });
      });
    });
  });

  return timetable;
}

