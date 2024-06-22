const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subjectsTaught: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model("Teacher", teacherSchema);