const express = require("express");
const router = express.Router();
const Teacher = require('../models/teacher')

router.get("/", async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers)
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.get("/:id", getTeacher, (req, res) => {
    res.json(res.teacher);
});


router.post("/", async (req, res) => {
    const teacher = new Teacher({
        name: req.body.name,
        subjectsTaught: req.body.subjectsTaught
    });

    try {
        const newTeacher = await teacher.save();
        res.status(201).json(newTeacher);
    } catch (err) {
        res.status(400).post.json({message: err.message});
    }
});

router.put("/:id", getTeacher, async (req, res) => {
    if (req.body.name != null) {
        res.teacher.name = req.body.name;
    }
    if (req.body.subjectsTaught != null) {
        res.body.subjectsTaught = req.body.subjectsTaught;
    }

    try {
        const updatedTeacher = await res.teacher.save();
        res.json(updatedTeacher);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})

router.patch("/:id", getTeacher, async (req, res) => {
    listOfSubjects = req.body.subjectsTaught;
    finalList = [];
    for (let i = 0; i < listOfSubjects.length; i++) {
        if (res.teacher.subjectsTaught.includes(listOfSubjects[i])) {}
        else {
            res.teacher.subjectsTaught.push(listOfSubjects[i]);
        }
    }
    try {
        const updatedTeacher = await res.teacher.save();
        res.json(updatedTeacher);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})

router.get("/:id/classes", getTeacher, async (req, res) => {
    // use classes endpoint
})

// router.put("/:id", getTeacher, async (req, res) => {
//     res.teacher.teacher = req.body.teacher
//     try {
//         const updatedTeacher = await res.teacher.save();
//         res.json(updatedTeacher);
//     } catch(err) {
//         res.status(400).json({message: err.message});
//     }
// })

router.delete("/:id", getTeacher, async (req, res) => {
    try {
        await res.teacher.deleteOne();
        res.json({message: "deleted teacher"});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

async function getTeacher(req, res, func) {
    let teacher
    try {
        teacher = await Teacher.findById(req.params.id);
        if (teacher == null) {
            return res.status(404).json({message: "Cannot find teacher"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.teacher = teacher;
    func();
};

module.exports = router;