const UserModel = require("../models/User");

module.exports = async (req, res, next) => {
  if(!req.session.userId){
    return res.status(500).send({
      error: "no has iniciado sesion."
    })
  }
  
  const userFound = await UserModel.findById({ _id: req.session.userId });
  if (!userFound) {
    return res.status(404).send({
      error: "estas credenciales no estan registradas.",
    });
  }

  next();
};
