const mongoose = require("mongoose");
const { Schema } = mongoose;

const InvestorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
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
  companies: {
    type: [
      {
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
        },
        founder_name: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Investor", InvestorSchema);
