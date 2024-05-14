const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const clinicRouter = require("./routes/clinicRoutes");

const bodyParser = require("body-parser");

// below parser only for form data not for json.
app.use(express.urlencoded({ extended: false }));

// json parser
app.use(bodyParser.json());

// middelware for Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
});
app.use("/clinic", clinicRouter);

//error catching middleware
app.use((error, req, res, next) => {
  console.log("error middleware hit");
  const status = error.statusCode || 500;
  if (error.message) {
    const message = error.message;
  } else {
    const message = "some ERROR OCCURED";
  }
  console.log("error message is ");
  console.log(error.message);
  res.status(status).json({ message: error.message });
});

mongoose
  .connect(process.env.MONGO_STRING)
  .then((result) => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log("app started");
    });
  })
  .catch((err) => {
    console.log(process.env.MONGO_STRING);
    console.log("Error occured connecting to DB");
    // console.log(err);
  });
