const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const clinicController = require("../controllers/clinicController");

// All roote will have prefix "/clinic"

router.get("/", clinicController.getPost);

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .custom((value, { req }) => {
        console.log("");
        return true;
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 3 }),
    body("clinicName").trim().not().isEmpty(),
  ],
  clinicController.clinicSignup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .custom((value, { req }) => {
        console.log("");
        return true;
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 3 }),
  ],
  clinicController.clinicLogin
);

module.exports = router;
