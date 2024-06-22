const express = require("express");
const router = express.Router();
const Student = require('../models/student')
const Grade = require("../models/grade")
const Subject = require("../models/subject")

router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students)
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});



router.get("/:id", getStudent, (req, res) => {
    res.json(res.student);
});

router.get("/:id/grades", getStudent, async (req, res) => {
    const grades = await Grade.find({ student_id: req.params.id });
    res.json(grades);
})

function convertGrade(grade) {
    var grades = {
        "A": 4,
        "B": 3,
        "C": 2,
        "D": 1,
        "F": 0
    }
    var signs = {
        "+": 0.3,
        "-": -0.3
    }
    if (grade.length == 1) {
        return grades[grade];
    } return grades[grade[0]] + signs[grade[1]];
}

router.get("/:id/gpa", getStudent, async (req, res) => {
    const grades = await Grade.find({ student_id: req.params.id });
    totalCredits = 0;
    totalGPA = 0;
    for (let i = 0; i < grades.length; i++) {
        const subject = (await Subject.findById(grades[i]["subject_id"]));
        totalCredits = totalCredits + subject["creditHours"];
        const grade = convertGrade(grades[i]["grade"])
        totalGPA += grade * subject["creditHours"];
    }
    res.status(500).json({GPA: totalGPA/totalCredits});
})

router.get("/:id/gpa/:semester/:year", getStudent, async (req, res) => {
    try {
        const grades = await Grade.find({ student_id: req.params.id });
        let totalCredits = 0;
        let totalGPA = 0;
        let found = false;

        for (let i = 0; i < grades.length; i++) {
            if (req.params.semester == grades[i]["semester"] && req.params.year == grades[i]["year"]) {
                const subject = await Subject.findById(grades[i]["subject_id"]);
                if (subject) {
                    totalCredits += subject["creditHours"];
                    const grade = convertGrade(grades[i]["grade"]);
                    totalGPA += grade * subject["creditHours"];
                    found = true;
                }
            }
        }

        if (found) {
            const GPA = totalCredits != 0 ? totalGPA / totalCredits : 0;
            res.json({ GPA });
        } else {
            res.status(404).json({ message: "Invalid year or semester" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", async (req, res) => {
    const student = new Student({
        ...(req.body.class_enrollment_history && { class_enrollment_history: req.body.class_enrollment_history }),
        name: req.body.name,
        major: req.body.major
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).post.json({message: err.message});
    }
});

// router.patch("/:id", getStudent, async (req, res) => {
//     if (req.body.name != null) {
//         res.student.name = req.body.name;
//     }
//     if (req.body.creditHours != null) {
//         res.student.creditHours = req.body.creditHours;
//     }

//     try {
//         const updatedStudent = await res.student.save();
//         res.json(updatedStudent);
//     } catch(err) {
//         res.status(400).json({message: err.message});
//     }
// });

router.delete("/:id", getStudent, async (req, res) => {
    try {
        await res.student.deleteOne();
        res.json({message: "deleted student"});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

async function getStudent(req, res, func) {
    let student
    try {
        student = await Student.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({message: "Cannot find student"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.student = student;
    func();
};

module.exports = router;