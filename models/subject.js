const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creditHours: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("Subject", subjectSchema);