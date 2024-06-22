const express = require("express");
const router = express.Router();
const Grade = require('../models/grade')

router.get("/", async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades)
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.get("/:id", getGrade, (req, res) => {
    res.json(res.grade);
});


router.post("/", async (req, res) => {
    const grade = new Grade({
        student_id: req.body.student_id,
        subject_id: req.body.subject_id,
        grade: req.body.grade,
        semester: req.body.semester,
        year: req.body.year
    });

    try {
        const newGrade = await grade.save();
        res.status(201).json(newGrade);
    } catch (err) {
        res.status(400).post.json({message: err.message});
    }
});

router.put("/:id", getGrade, async (req, res) => {
    res.grade.grade = req.body.grade
    try {
        const updatedGrade = await res.grade.save();
        res.json(updatedGrade);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})

router.delete("/:id", getGrade, async (req, res) => {
    try {
        await res.grade.deleteOne();
        res.json({message: "deleted grade"});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

async function getGrade(req, res, func) {
    let grade
    try {
        grade = await Grade.findById(req.params.id);
        if (grade == null) {
            return res.status(404).json({message: "Cannot find grade"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.grade = grade;
    func();
};

module.exports = router;