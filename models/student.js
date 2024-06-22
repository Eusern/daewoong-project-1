const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    class_enrollment_history: [
        {
            class_id: mongoose.Schema.Types.ObjectId,
            semester: String,
            year: Number
        }
    ]
})

module.exports = mongoose.model("Student", studentSchema);