var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' });

app.post('/api/fileanalyse', upload.single('file'), function (req, res) {
   if (!req.file) {
       return res.status(400).send({ error: "No file uploaded" });
   }
   console.log(req.file, req.body);
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