const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer")
const port = 4000;

require('dotenv').config();

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

const mongoose = require("mongoose");


mongoose
    .connect("mongodb://localhost:27017/JobPortal")
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const post = require("./routes/post");
const user = require("./routes/user");


app.get("/", (req, res) => {
    res.send("hyy")
});

app.use("/", post);
app.use("/", user);


app.listen(port, () => {
    console.log(`post listing on ${port}`);
});