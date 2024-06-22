const express = require("express");
const router = express.Router();
const Classe = require('../models/class')
const Student= require("../models/student")

router.get("/", async (req, res) => {
    try {
        const classes = await Classe.find();
        res.json(classes)
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.get("/:id", getClasse, (req, res) => {
    res.json(res.classe);
});

async function updateStudent(student_id, class_id1, semester1, year1) {
    try {
        let student = await Student.findById(student_id);
        if (!student) {
            return { success: false, message: "Student not found" };
        }
        student.class_enrollment_history.push({
            class_id: class_id1,
            semester: semester1,
            year: year1
        });
        await student.save();
    } catch (err) {
        return { success: false, message: err.message };
    }
}
router.post("/", async (req, res) => {
    const classe = new Classe({
        subject_id: req.body.subject_id,
        teacher_id: req.body.teacher_id,
        semester: req.body.semester,
        year: req.body.year,
        student_ids: req.body.student_ids
    });

    try {
        const newClasse = await classe.save();
        res.status(201).json(newClasse);
    } catch (err) {
        res.status(400).post.json({message: err.message});
    }
});

router.put("/:id/enroll", getClasse, async (req, res) => {
    if (req.body.student_ids != null) {
        res.classe.student_ids = req.body.student_ids;
        for (let i = 0; i < req.body.student_ids.length; i++) {
            updateStudent(req.body.student_ids[i], res.classe.class_id, res.classe.semester, res.classe.year);
        }
    }
    try {
        const updatedClasse = await res.classe.save();
        res.json(updatedClasse);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})

router.patch("/:id/enroll", getClasse, async (req, res) => {
    listOfStudents= req.body.student_ids;
    finalList = [];
    for (let i = 0; i < listOfStudents.length; i++) {
        if (res.classe.student_ids.includes(listOfStudents[i])) {}
        else {
            finalList.push(listOfStudents[i]);
        }
    }
    for (let i = 0; i < req.body.student_ids.length; i++) {
        updateStudent(req.body.student_ids[i], res.classe.class_id, res.classe.semester, res.classe.year);
    }
    try {
        const updatedClasse = await res.classe.save();
        res.json(updatedClasse);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})

router.delete("/:id/drop", getClasse, async (req, res) => {
    try {
        let student = await Student.findById(req.body.student_id);
        //console.log(student)
        if (!student) {
            res.json({ success: false, message: "Student not found" });
        }
        for (let i = 0; i < student.class_enrollment_history.length; i++) {
            if (student.class_enrollment_history[i].class_id == res.classe.class_id) {
                console.log("class found")
                student.class_enrollment_history.splice(i, 1);
            }
        }
        await student.save();
        res.status(500).json("dropped student")
    } catch (err) {
        res.json({ success: false, message: err.message });
    }

})

async function getClasse(req, res, func) {
    let classe
    try {
        classe = await Classe.findById(req.params.id);
        if (classe == null) {
            return res.status(404).json({message: "Cannot find classe"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.classe = classe;
    func();
};

module.exports = router;