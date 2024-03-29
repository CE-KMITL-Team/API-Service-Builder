const express = require("express");
const router = express.Router();

const crypto = require("crypto");

const userModel = require("../models/userModel");

// Encryption function
function encrypt(text) {
  let secretKey = "APIServicebuilder-Secret-Key";
  const cipher = crypto.createCipher('aes-128-cbc', secretKey);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decryption function
function decrypt(encrypted) {
  console.log(encrypted);
  let secretKey = "APIServicebuilder-Secret-Key";
  const decipher = crypto.createDecipher('aes-128-cbc', secretKey);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/* Login */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Error Message
  const error = { msg: "Incorrect user !", status: false };

  try {
    // Query SELECT
    const data = await userModel.findOne({ where: { email } });

    if (!data) {
      return res.status(200).send(error);
    }

    // Check Password
    const hashedPassword = encrypt(password);

    if (hashedPassword !== data.password) {
      return res.status(200).send(error);
    }

    delete data.dataValues.password;

    return res.status(200).send({ userData: data, status: true });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

/*Register*/
function generateBarrerKey(user_id) {
  // Generate Key
  const key = crypto.randomBytes(32); // 32 bytes = 256 bits

  // Encode
  const numberToEncode = user_id;
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encryptedNumber = cipher.update(
    numberToEncode.toString(),
    "utf-8",
    "hex"
  );
  encryptedNumber += cipher.final("hex");
  return encryptedNumber;
}

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  //Error Message
  const error = { msg: "Email is already exists", status: false };

  //Query SELECT
  const data = await userModel.findOne({ where: { email } });

  if (data) {
    return res.status(200).send(error);
  }

  const hashedPassword = encrypt(password);

  let latestInsertId;

  userModel
    .create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    })
    .then((result) => {
      latestInsertId = result.dataValues.id;

      const key = generateBarrerKey(latestInsertId);
      return userModel.update(
        { api_key: key },
        { where: { id: latestInsertId } }
      );
    })
    .then(() => {
      return userModel.findOne({ where: { id: latestInsertId } });
    })
    .then((updatedUser) => {
      delete updatedUser.dataValues.password;
      return res.status(200).send({ userData: updatedUser, status: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(200).send({ ...error, msg: "Error registering user" });
    });
});

/* Check if email exists */
router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    // Query SELECT
    const data = await userModel.findOne({ where: { email } });

    if (data) {
      return res
        .status(200)
        .send({ msg: "Email already exists", status: false });
    }

    return res.status(200).send({ status: true });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
