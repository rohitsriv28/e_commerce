const port = 4040;

const express = require("express");
const app = express();
const { error } = require("console");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { type } = require("os");

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
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Upload Endpoint Creation
app.use("/images", express.static("uploads/images"));
app.post("/upload", upload.single("product"), (request, response) => {
  response.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${request.file.filename}`,
  });
});

//Schema for Creating & Deleting product in Db
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addProduct", async (request, response) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let lastProductArray = products.slice(-1);
    let lastProduct = lastProductArray[0];
    id = lastProduct.id + 1;
  } else {
    id = 1;
  }
  try {
    const product = new Product({
      id: id,
      name: request.body.name,
      image: request.body.image,
      category: request.body.category,
      newPrice: request.body.newPrice,
      oldPrice: request.body.oldPrice,
    });
    console.log(product);

    await product.save();
    console.log("Saved!");

    response.json({
      success: true,
      name: request.body.name,
    });
  } catch (error) {
    console.log("Error saving product:", error);
    response.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/removeProduct", async (request, response) => {
  await Product.findOneAndDelete({
    id: request.body.id,
  });
  console.log("Removed");
  response.json({
    success: true,
    name: request.body.name,
  });
});

//API for All Products
app.get("/allProducts", async (request, response) => {
  let products = await Product.find({});
  console.log("All products fetched!");
  response.send(products)
});
