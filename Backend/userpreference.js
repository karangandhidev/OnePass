const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userPreferenceSchema = new mongoose.Schema(
  {
    length: {
      type: Number,
      required: true,
    },
    isUpper: {
      type: Boolean,
      required: true,
    },
    isLower: {
      type: Boolean,
      required: true,
    },
    isNumber: {
      type: Boolean,
      required: true,
    },
    isSpecial: {
      type: Boolean,
      required: true,
    },
    generalChar: {
      type: Boolean,
      required: true,
    },
    specialChar: {
      type: Boolean,
      required: true,
    },
    parenthesis: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "password preference",
  }
);

const model = mongoose.Model("passpreference", userPreferenceSchema);
router.get("/preference", async (req, res) => {
  let preference = await model.findOne({}).lean();
  res.status(200).json(preference);
});
router.post("/preference", (req, res) => {
  const {
    length,
    isUpper,
    isLower,
    isNumber,
    isSpecial,
    generalChar,
    specialChar,
    parenthesis,
  } = req.body;
});
