const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const preference = require("./userpreference").model;

const secret = "afhakjfgakfg&*%^$%^afasdk";
const bcrypt = require("bcryptjs");
const router = express.Router();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hint: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
  }
);

const model = mongoose.model("userSchema", userSchema);
router.post("/register", async (req, res) => {
  model
    .find({})
    .then((db) => {
      if (db.length > 0) {
        mongoose.connection.db
          .dropDatabase()
          .then(async () => {
            let { username, password, hint } = req.body;
            password = bcrypt.hashSync(password, 10);
            try {
              let response = await model.create({
                username,
                password,
                hint,
              });
              // return res.status(200).json({status:"okay"})
            } catch (error) {
              console.log(error);
              return res.json({ status: "error" });
            }
          })
          .catch((er) => console.log(er));
      }
    })
    .catch((err) => console.log(err));
  let { username, password, hint } = req.body;

  password = bcrypt.hashSync(password, 10);
  try {
    let response = await model.create({
      username,
      password,
      hint,
    });
    let res = await preference.create({
      length: 8,
      isUpper: false,
      isLower: true,
      isNumber: false,
      isSpecial: false,
      generalChar: false,
      specialChar: false,
      parenthesis: false,
      exclusion: "!@#$%^&*-.,?_`~;:+=<>|/(){}[]",
    });
    res.status(200).send({ status: "okay" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const User = await model.findOne({ username }).lean();
  if (!User) {
    return res
      .status(403)
      .send({ status: "error", error: "Invalid username or password" });
  }
  if (await bcrypt.compare(password, User.password)) {
    const token = jwt.sign(User, secret);
    res.status(200).send({
      data: token,
    });
  } else {
    res.status(403);
    res.json({ error: "Invalid username or password" });
  }
  console.log(username);
});
router.get("/creds", async (req, res) => {
  const User = await model.findOne({});
  res.status(200).json({ username: User.username, hint: User.hint });
});

router.post("/changepass", async (req, res) => {
  const { OldPassword, NewPassword } = req.body;

  const User = await model.findOne({}).lean();
  if (await bcrypt.compare(OldPassword, User.password)) {
    const newpass = bcrypt.hashSync(NewPassword, 10);
    try {
      model.findByIdAndUpdate(
        User._id,
        { password: newpass },
        { useFindAndModify: false },
        function (err, docs) {
          if (err) {
            console.log(err);
          }
        }
      );
      return res.status(200).json({ message: "Password Updated" });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ message: "User Unauthorize" });
  }
});
router.put("/changeusername", async (req, res) => {
  const { Username } = req.body;
  const User = await model.findOne({});

  try {
    model.findByIdAndUpdate(
      User._id,
      { username: Username },
      { useFindAndModify: false },
      function (err, docs) {
        if (err) {
          console.log(err);
        }
      }
    );
    return res.status(200).json({ message: "Username Updated" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/changehint", async (req, res) => {
  const { hint } = req.body;
  const User = await model.findOne({});

  try {
    model.findByIdAndUpdate(
      User._id,
      { hint: hint },
      { useFindAndModify: false },
      function (err, docs) {
        if (err) {
          console.log(err);
        }
      }
    );
    return res.status(200).json({ message: "Hint Updated" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
