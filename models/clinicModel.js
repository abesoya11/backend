const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clinicSchema = new Schema({
  clinicName: {
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
  },
  Adress: {
    type: String,
  },
  doctor: [
    {
      type: Schema.Types.ObjectId,
      ref: "doctor",
    },
  ],
});

module.exports = mongoose.model("clinic", clinicSchema);
