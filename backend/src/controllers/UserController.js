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
  // recibiendo los datos
  const { email, password } = req.body;
  // verificando que lleguen los datos
  if (!email || !password) {
    return res.status(500).send({ error: "llene el formulario." });
  }
  // validando que las credenciales esten registradas
  const userFound = await UserModel.findOne({ email }).lean();

  if (!userFound) {
    return res.status(404).send({
      user: req.body,
      error: "Estas Credenciales no estan registradas.",
    });
  }
  // validando password
  const check = bcrypt.compare(password, userFound.password);

  if (!check) {
    return res.status(403).send({
      error: "la contraseña no es correcta",
    });
  }
  // guardando ID del usuario en la session
  req.session.userId = userFound._id;
  // respuesta :D
  return res.status(200).send({
    user: {
      ...userFound,
      password: undefined,
    },
  });
}

async function deleteUser(req, res) {
  // recibiendo ID de usuario
  const userDeleted = await UserModel.findByIdAndDelete(req.params.id);
  // verificando que se elimino el usuario
  if (!userDeleted) {
    return res.status(404).send({
      message: "Estas Credenciales no estan registradas.",
    });
  }
  // respuesta :D
  return res.status(200).send({
    userDeleted,
  });
}

async function allAdminUsers(req, res) {
  // buscando los usuarios Administradores
  const adminUsers = await UserModel.find({ role: "ADMIN" })
    .select(["first_name", "last_name", "nick", "email", "role", "hour_key"])
    .lean();
  // respuesta :D
  res.status(200).send({ adminUsers });
}

async function signOff(req, res) {
  if (!req.session.userId) {
    return res.status(404).send({
      error: "no has iniciado sesion",
    });
  }
  const userFound = await UserModel.findById(req.session.userId).lean();
  req.session.userId = null;
  return res.status(200).send({
    userData: {
      ...userFound,
      password: undefined,
    },
  });
}

module.exports = {
  Register,
  Login,
  allAdminUsers,
  deleteUser,
  signOff,
};
