const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    semester: {
        type: String
    },
    year: {
        type: Number
    },
    student_ids: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

module.exports = mongoose.model("Class", classSchema);