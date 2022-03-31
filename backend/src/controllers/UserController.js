// imports
const bcrypt = require("bcrypt");
const DateHelper = require("../helpers/DateHelper");

// Models
const UserModel = require("../models/User");

async function Register(req, res) {
  // recibiendo los datos de la req
  const { first_name, last_name, nick, email, password } = req.body;
  // verificando que lleguen todos los datos
  if (!first_name || !last_name || !nick || !email || !password) {
    return res.status(500).send({ error: "llene el formulario." });
  }
  // verificando que no hayan usuarios repetidos
  const match =
    (await UserModel.findOne({ email })) || (await UserModel.findOne({ nick }));

  if (match) {
    return res.status(404).send({
      user: req.body,
      error: "Estas credenciales ya estan en uso.",
    });
  }
  // creando y validando la clave de administrador (hourKey)
  let role = DateHelper(password);
  const hourKeyMatch = await UserModel.find({ hour_key: role.hourKey }).lean();
  if (hourKeyMatch && role != "USER") {
    role = {
      ...role,
      hourKey: `${role.hourKey}$${new Date().getMilliseconds()}`,
    };
  }
  // encriptando password y guardando los datos
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);
  const userStored = new UserModel({
    ...req.body,
    password: hash,
    role: role !== "USER" ? role.role : "USER",
    hour_key: role !== "USER" ? role.hourKey : undefined,
  });
  await userStored.save();
  // response
  return res.status(200).send({ user: userStored });
}

async function Login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).send({ error: "llene el formulario." });
  }

  const userFound = await UserModel.findOne({ email }).lean();

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

async function allAdminUsers(req, res) {
  const adminUsers = await UserModel.find({ role: "ADMIN" })
    .select(["first_name", "last_name", "nick", "email", "role", "hour_key"])
    .lean();
  res.status(200).send({ adminUsers });
}

module.exports = {
  Register,
  Login,
  allAdminUsers,
};
