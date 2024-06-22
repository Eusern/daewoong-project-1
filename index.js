const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8080;

mongoose.connect("mongodb+srv://eusern:E7tdC3ujabXsRVxV@cluster0.nml4t8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const db = mongoose.connection 

app.use(express.json());

const subjectsRouter = require("./routes/subjects");
const studentsRouter = require("./routes/students");
const gradesRouter = require("./routes/grades");
const teachersRouter = require("./routes/teachers");
const classesRouter = require("./routes/classes");

app.use("/subjects", subjectsRouter);
app.use("/students", studentsRouter);
app.use("/grades", gradesRouter);
app.use("/teachers", teachersRouter);
app.use("/classes", classesRouter);

app.listen(
    PORT, () => console.log(`hosted on http://localhost:${PORT}`)
)

// app.get('/data', (req, res) => {
//     res.status(200).send({
//         data1: "1",
//         data2: "2"
//     })
// });

// app.post('/data/:id', (req, res) => {
//     const {id} = req.params;
//     const {data1} = req.body;

//     if (!data1) {
//         res.status(418).send({message: "no body given"});
//     }

//     res.send({
//         data: `data with id:${id} and body:${data1}` 
//     });
// });