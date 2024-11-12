var express = require("express");
var cors = require("cors");
var path = require("path");
require("dotenv").config();

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

const multer = require('multer');
const upload = multer();

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
   if (!req.file) {
       return res.status(400).send({ error: "No file uploaded" });
   }
   res.send({
       filename: req.file.originalname,
       size: req.file.size,
       mimetype: req.file.mimetype
   });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
