const mongoose = require("mongoose");
const { decrypt, encrypt } = require("./hash");
const router = require("express").Router();
const user = require("./users").model;
const questionSchema = mongoose.Schema(
  {
    question: {
      type: Object,
      required: true,
    },
    answer: {
      type: Object,
      required: true,
    },
  },
  { collection: "2ndfactorauth" }
);

const model = mongoose.model("questions", questionSchema);

router.get("/questions", async (req, res) => {
  let questions = await model.find({});
  questions.map((q) => {
    q.question = decrypt(q.question);
    q.answer = decrypt(q.answer);
  });

  return res.status(200).json(questions);
});

router.post("/questions", (req, res) => {
  let { question, answer } = req.body;
  console.log(question, answer);
  question = encrypt(question);
  answer = encrypt(answer);

  try {
    let response = model.create({ question, answer });
    res.status(200).json({ message: "question created" });
  } catch (e) {
    console.log(e);
  }
});

router.post("/2ndauth", async (req, res) => {
  let { id, answer } = req.body;
  let Question = await model.findById({ _id: id });
  Question.answer = decrypt(Question.answer);
  if (Question.answer.toLowerCase().includes(answer.toLowerCase())) {
    res.status(200).json({ message: "Correct Answer" });
  } else {
    res.status(401).json({ message: "Wrong Answer" });
  }
});

router.put("/questions", async (req, res) => {
  let { _id, password, question, answer } = req.body;
  // console.log(_id)
  console.log(question, answer);
  const User = await user.find({}).lean();
  // console.log(User[0])
  const ogpass = decrypt(User[0].password);
  if (password === ogpass) {
    question = encrypt(question);
    answer = encrypt(answer);
    model.findByIdAndUpdate(
      { _id: _id },
      { $set: { question: question, answer: answer } },
      { new: true, useFindAndModify: false },
      (err, data) => {
        res.send("updated");
        res.end();
      }
    );
  } else {
    res.status(401).json({ message: "User UnAuthorized" });
  }
});

module.exports = router;
