// imports
const bcrypt = require("bcrypt");

// Models
const User = require("../models/User");

async function Register(req, res) {
  const { first_name, last_name, nick, email, password } = req.body;

  if (!first_name || !last_name || !nick || !email || !password) {
    return res.status(404).send({ error: "llene el formulario." });
  }

  const match =
    (await User.findOne({ email })) || (await User.findOne({ nick }));

  if (match) {
    return res.status(403).send({
      user: req.body,
      error: "Estas credenciales ya estan en uso.",
    });
  }

  await bcrypt.genSalt(15, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      const userStored = new User({...req.body, password: hash});
      res.send(userStored);
    });
  })
}

module.exports = { Register };
