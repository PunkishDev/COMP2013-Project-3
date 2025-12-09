//Initializations
const express = require("express");
const server = express();
const port = 3000;
require("dotenv").config();

//Security Initializations
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;

//Database Initializations
const mongoose = require("mongoose");
const { DB_URI } = process.env;
const Product = require("./models/product");
const User = require("./models/user");
//Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Server Connection
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Routes
server.get("/", (request, response) => {
  response.send("LIVE!");
});

server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const id = crypto.randomUUID();
  const product = new Product({
    productName,
    brand,
    price,
    image,
    id,
  });

  try {
    await product
      .save()
      .then((result) =>
        response.status(201).send(`${productName} added\nwith id: ${id}`)
      );
  } catch (error) {
    console.log(error.message);
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id).then((result) => {
      console.log(result);
      response.status(200).send(result);
    });
  } catch (error) {
    console.log(error.message);
  }
});

server.patch("/products/:id", async (request, response) => {
  const prodId = request.params.id;
  const { productName, brand, image, price, id } = request.body;

  try {
    await Product.findByIdAndUpdate(prodId, {
      productName,
      brand,
      image,
      price,
      id,
    }).then((result) =>
      response.status(200).send(`${productName} edited\nwith id: ${prodId}`)
    );
  } catch (error) {
    console.log(error.message);
  }
});

//all of this will be for the login and registration portion of the project

server.post("/create-user", async (request, response) => {
  const { username, password, isAdmin } = request.body;
  console.log("BODY:", request.body);
  try {
    //hashing password need bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin,
    });
    await newUser.save();
    return response.status(200).send({ message: "user Created" });
  } catch (error) {
    console.log("Error during create-user:", error);
    //console.log("oopsie"); //error testing lol

    //checks for a duplicate username in the db
    if (error.code === 11000) {
      return response.status(400).send({
        message: "Username already exists!",
      });
    }

    // Generic server error
    return response.status(500).send({
      message: "Server error. Please try again.",
    });
  }
});

//login exists
server.post("/", async (request, response) => {
  const { username, password, isAdmin } = request.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(400).send({ message: "user does not exist" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return response
        .status(403)
        .send({ message: "username or password is incorrect" });
    }

    const jwtToken = jwt.sign(
      { id: user._id, username, isAdmin: user.isAdmin },
      SECRET_KEY
    );
    return response
      .status(201)
      .send({ message: "user authenticated", token: jwtToken });
  } catch (error) {
    response.status(500).send(error.message);
  }
});
