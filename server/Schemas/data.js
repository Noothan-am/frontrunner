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
  company: {
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
    unique: true, // Consider making the founder_id unique
  },
  founder_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Consider making the email unique
  },
  password: {
    type: String,
    required: true,
  },
  data: {
    june: {
      revenue: {
        type: Number,
        required: true,
      },
      sales: {
        type: Number,
        required: true,
      },
      profit: {
        type: Number,
        required: true,
      },
    },
    july: {
      revenue: {
        type: Number,
        required: true,
      },
      sales: {
        type: Number,
        required: true,
      },
      profit: {
        type: Number,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("Founder", FounderSchema);

module.exports = mongoose.model("Investor", InvestorSchema);
