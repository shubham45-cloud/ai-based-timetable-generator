import express from "express";
const router = express.Router();

const handleGenerate = async () => {
  try {
    setLoading(true);

    const savedRules = JSON.parse(localStorage.getItem("aiRules"));
    if (!savedRules) {
      alert("Please set AI rules first");
      return;
    }

    setRules(savedRules);

    // TEMP AI LOGIC (backend later)
    const generated = {
      Monday: ["Math", "DBMS", "OS"],
      Tuesday: ["AI", "Math", "DBMS"],
    };

    setTimeout(() => {
      setTimetable(generated);
      setLoading(false);
    }, 1500);

  } catch (err) {
    console.error(err);
    setLoading(false);
    alert("AI failed. Check console.");
  }
};


export default router;
