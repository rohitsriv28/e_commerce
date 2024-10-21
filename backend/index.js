const port = 4040;

const express = require("express");
const app = express();
const { error } = require("console");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use(cors());

//Database Connectio with MongoDB
mongoose.connect(
  "mongodb+srv://rohitraj:admin@ecommcluster.e2ab0.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=EcommCluster"
);

//API Creation
app.get("/", (request, response) => {
  response.send("Express is running");
});

//Start the Server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port:", port);
  } else {
    console.log("Error", error);
  }
});

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Upload Endpoint Creation
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (request, response) => {
  response.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${request.file.fieldname}`,
  });
});
