const express = require('express');
const app = express();
const mongoose = require("mongoose");

var bodyParser = require('body-parser');
const routes = require('./routes/routes')


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



var DBCONFIG = "mongodb://localhost/medapi";

// var Chats = mongoose.model("chats",{
//     name: String,
//     message:String
// });


// app.post("/chats",(req, res) => {

//     const chatdet = new Chats({
//         name:req.body.name,
//         message:req.body.message
//     })

//     chatdet.save().then((chat) => {res.send("done")}).catch(err => {
//         res.status(400).send("Some Error")
//     })

// })






mongoose.connect(DBCONFIG,{useNewUrlParser: true});
let database = mongoose.connection;

database.on("error",console.error.bind(console,"connection error:"));
database.once("open",()=>{
    console.log("MongoDB is connected")
})



// Routes of API

app.use("/apiv1/medical/",routes);



app.listen(3020,"0.0.0.0",()=>{
    console.log("Well Done, Now I am Listening");
});

app.use(express.static(__dirname))
