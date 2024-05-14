const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  clinic: [
    {
      type: Schema.Types.ObjectId,
      ref: "clinic",
    },
  ],
});

module.exports = mongoose.model("doctor", cAdminSchema);
