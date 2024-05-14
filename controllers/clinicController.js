const Clinic = require("../models/clinicModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.getPost = (req, res, next) => {
  res.status(200).json({
    message: "hello boy",
  });
};

exports.createClinic = (req, res, next) => {
  console.log(req.body.message);
  res.status(200).json({
    message: "received succussfully",
  });
};

exports.clinicSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("validation error");
    err.statusCode = 422;
    err.message = errors.array();
    throw err;
  }

  const clinicName = req.body.clinicName;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 11)
    .then((hashedPass) => {
      const clinic = new Clinic({
        clinicName,
        email,
        password: hashedPass,
      });

      return clinic.save();
    })
    .then((result) => {
      console.log("success saved clinic");
      // console.log(res);
      res.status(200).json({
        message: "received succussfu",
        result: result,
      });
    })
    .catch((err) => {
      console.log("error in saving clinic");
      console.log(err);
    });
};

exports.clinicLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("validation error");
    err.statusCode = 422;
    err.message = errors.array();
    throw err;
  }

  const email = req.body.email;
  const password = req.body.password;
  let clinic;
  // extracting password of clinic logged in to compare
  Clinic.findOne({ email: email })
    .then((res) => {
      if (!res) {
        const err = new Error("Invalid Email Clinic Not Found");
        err.code = 401;
        throw err;
      }
      clinic = res;
      return bcrypt.compare(password, clinic.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const err = new Error("Enter Correct Password");
        err.code = 401;
        throw err;
      }
      // if password is correct we generate JWT Token
      const token = jwt.sign(
        {
          clinicId: clinic._id.toString(),
        },
        process.env.JWTSECRET,
        { expiresIn: "1h" }
      );
      console.log("secsexfull login");
      res.status(201).json({ token: token, clinicId: clinic._id.toString() });
    })
    .catch((err) => {
      next(err);
    });
};
