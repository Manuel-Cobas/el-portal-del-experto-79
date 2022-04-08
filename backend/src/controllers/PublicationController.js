// Imports
const PublicationModel = require("../models/Publication");

// ----- New Post -----
async function newPublication(req, res) {
  // recibiendo datos
  const { title, description } = req.body;
  // verificando que lleguen los datos
  if (!title || !description) {
    return res.status(500).send({
      error: "formulario incompleto",
    });
  }
  // guardando los datos en el modelo
  const newPublication = new PublicationModel({
    title,
    description,
    author: req.session.userId,
    date: new Date().toLocaleDateString(),
    image: null,
  });
  // guardando la publicacion
  await newPublication.save();
  // respuesta :D
  res.status(200).send({
    newPublication,
  });
}

// ----- Edit Publication -----

async function editPublication(req, res) {
  // verificando que el id llegue
  if (!req.params.id) {
    return res.status(404).send({
      error: "error id indefinido",
    });
  }
  // recibiendo datos
  const { title, description } = req.body;
  const publicationFound = await PublicationModel.findById(req.params.id);
  // verificando que lleguen los datos
  if (!title || !description) {
    return res.status(500).send({
      error: "llene el formulario",
    });
  }
  // verificando que exista la publicacion
  if (!publicationFound) {
    return res.status(403).send({
      error: "esta publicacion no existe.",
    });
  }
  // guardando los cambios
  const updatedPublication = await PublicationModel.findByIdAndUpdate(
    publicationId,
    { title, description },
    { new: true }
  );
  // respuesta :D
  return res.status(200).send({
    updatedPublication,
  });
}
// ----- Delete Publication -----

async function deletePublication(req, res) {
  // verificando que llegue el id
  if (!req.params.id) {
    return res.status(404).send({
      error: "error id indefinido",
    });
  }
  // verificando que exista la publicacion
  const publicationFound = await PublicationModel.findById(req.params.id);

  if (!publicationFound) {
    return res.status(403).send({
      error: "la publicacion no existe",
    });
  }
  // eliminando publicacion
  const deletedPublication = await PublicationModel.findByIdAndDelete(
    req.params.id
  );
  // respuesta :D
  return res.status(200).send({
    deletedPublication,
  });
}

// ----- All My Publications -----

async function allMyPublications(req, res) {
  // buscando las publicaciones del usuario logueado
  const publications = await PublicationModel.find({
    author: req.session.userId,
  });
  // verificando que hayan publicaciones para mostrar
  if (!publications) {
    return res.status(404).send({
      error: "no tienes publicaciones.",
    });
  }
  // resuesta :D
  return res.status(200).send({
    myPublications: publications,
  });
}

// ----- All Admin Publication -----


async function allAdminPublications(req, res) {
  // buscando todas las publicaciones de los administradores
  const publications = await PublicationModel.find().populate("author");
  // verificando que hayan publicaciones para mostrar
  if (!publications) {
    return res.status(404).send({
      error: "error no hay publicaciones para mostrar.",
    });
  }
  // respuesta :D
  res.status(200).send({
    publications,
  });
}

// ----- Exports -----

module.exports = {
  newPublication,
  editPublication,
  deletePublication,
  allMyPublications,
  allAdminPublications,
};
