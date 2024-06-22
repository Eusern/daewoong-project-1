const express = require("express");
const router = express.Router();
const Subject = require('../models/subject')

router.get("/", async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects)
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.get("/:id", getSubject, (req, res) => {
    res.json(res.subject);
});

router.post("/", async (req, res) => {
    if (req.body.name == null || req.body.creditHours == null) {
        res.status(400).json({message: 'missing name or/and credit hours'});
    }
    else{
        const subject = new Subject({
            name: req.body.name,
            creditHours: req.body.creditHours
        });

        try {
            const newSubject = await subject.save();
            res.status(201).json(newSubject);
        } catch (err) {
            res.status(400).post.json({message: err.message});
        }
    }
});

router.patch("/:id", getSubject, async (req, res) => {
    if (req.body.name != null) {
        res.subject.name = req.body.name;
    }
    if (req.body.creditHours != null) {
        res.subject.creditHours = req.body.creditHours;
    }

    try {
        const updatedSubject = await res.subject.save();
        res.json(updatedSubject);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

router.delete("/:id", getSubject, async (req, res) => {
    try {
        await res.subject.deleteOne();
        res.json({message: "deleted subject"});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

async function getSubject(req, res, func) {
    let subject
    try {
        subject = await Subject.findById(req.params.id);
        if (subject == null) {
            return res.status(404).json({message: "Cannot find subject"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.subject = subject;
    func();
};

module.exports = router;