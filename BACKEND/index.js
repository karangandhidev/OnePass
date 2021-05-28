const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const user = require("./users");
const address = require("./address");
const cards = require("./cards");
const bank = require("./banks");
const notes = require("./notes");
const passwords = require("./passwords");
const generator = require("generate-password");
const app = express();

const port = process.env.port || 3000;
var corsoption = {
  origin: ["http://10.0.0.3:19006", "http://localhost:19006"],
};

app.use(express.static(path.join(__dirname, "static")));
app.listen(port, () => console.log("Listening"));
app.use(bodyParser.json());
app.use(cors(corsoption));

mongoose
  .connect("mongodb://localhost:27017/onepass", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("done"));
app.use(user, passwords.router, cards.router, address.router, notes.router);

app.get("/alldata", async (req, res) => {
  const token = req.header("Auth");
  if (token) {
    const verification = jwt.verify(token, secret);
    if (verification) {
      const Address = await address.model.find({});
      const Bank = await bank.bank.find({});
      const Cards = await cards.model.find({});
      const Passwords = await passwords.model.find({});
      const Notes = await notes.notes.find({});
      const data = [Address, Bank, Cards, Passwords, Notes];
      console.log(data);
      res.status(200).json(data);
    } else {
      res.status(200).json({ message: "User Unauthorized" });
    }
  } else {
    res.status(200).json({ message: "User Unauthorized" });
  }
});

app.post("/generatepass", (req, res) => {
  const { length, numbers, uppercase, lowercase, symbols, exclude } = req.body;

  let pass = generator.generate({
    length: length,
    numbers: numbers,
    uppercase: uppercase,
    lowercase: lowercase,
    symbols: symbols,
    exclude: exclude,
    strict: true,
  });

  res.status(200).send(pass);
});
