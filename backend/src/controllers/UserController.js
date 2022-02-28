// imports
const bcrypt = require("bcrypt");

// Models
const User = require("../models/User");

async function Register(req, res) {
  const { first_name, last_name, nick, email, password } = req.body;

  if (!first_name || !last_name || !nick || !email || !password) {
    return res.status(500).send({ error: "llene el formulario." });
  }

  const match =
    (await User.findOne({ email })) || (await User.findOne({ nick }));

  if (match) {
    return res.status(404).send({
      user: req.body,
      error: "Estas credenciales ya estan en uso.",
    });
  }

  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);
  const userStored = new User({ ...req.body, password: hash });
  await userStored.save();

  return res.status(200).send({ user: userStored });
}

async function Login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).send({ error: "llene el formulario." });
  }

  const userFound = await User.findOne({ email }).lean();

  if (!userFound) {
    return res.status(404).send({
      user: req.body,
      error: "Estas Credenciales no estan registradas.",
    });
  }

  const check = bcrypt.compare(password, userFound.password);

  if (!check) {
    return res.status(403).send({
      error: "la contraseña no es correcta",
    });
  }

  const userId = JSON.stringify(userFound._id);
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(userId, salt);

  req.session.userId = hash;

  return res.status(200).send({
    user: userFound,
  });
}

module.exports = {
  Register,
  Login,
};
