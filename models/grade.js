const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    grade: {
        type: String
    },
    semester: {
        type: String
    },
    year: {
        type: Number
    }
})

module.exports = mongoose.model("Grade", gradeSchema);