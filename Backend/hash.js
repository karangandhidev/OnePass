const crypto = require("crypto"),
  resizedIV = Buffer.allocUnsafe(16),
  iv = crypto.createHash("sha256").update("myHashedIV").digest();
const newiv = "<Buffer 38 9e d8 b6 06 02 00 00 40 a9 d8 b6 06 02 00 00>";
const createCypher = (data) => {
  console.log(resizedIV);
  const key = "d59b50ad1a3772e659665456e35fee55",
    cipher = crypto.createCipheriv("aes256", key, resizedIV);
  cipher.update(data, "binary", "binary");
  return cipher.final("binary");
};
const decypher = (data) => {
  console.log(resizedIV);
  const key = "d59b50ad1a3772e659665456e35fee55",
    decipher = crypto.createDecipheriv("aes256", key, resizedIV),
    msg = [];

  msg.push(decipher.update(data, "binary", "binary"));
  msg.push(decipher.final("binary"));
  return msg.join("");
};

module.exports = { createCypher, decypher };
