const mongoose = require("mongoose");
const { Schema } = mongoose;

const FounderSchema = new Schema({
  comp_id: {
    type: String,
    required: true,
  },
  comp_name: {
    type: String,
    required: true,
  },
  founder_id: {
    type: String,
    required: true,
    unique: true,
  },
  founder_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Founder", FounderSchema);
