// Imports
const UserModel = require("../models/User");
const PublicationModel = require("../models/Publication");

// ----- New Post -----
async function newPublication(req, res) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(500).send({
      error: "formulario incompleto",
    });
  }

  const newPublication = new PublicationModel({
    title,
    description,
    author: req.session.userId,
    date: new Date().toLocaleDateString(),
    image: null,
  });

  await newPublication.save();

  res.send({
    newPublication,
  });
}

async function editPublication(req, res) {
  const { title, description } = req.body;
  const publicationId = req.params.id;

  if (!title || !description) {
    return res.status(404).send({
      error: "llene el formulario",
    });
  }

  const updatedPublication = await PublicationModel.findByIdAndUpdate(
    publicationId,
    { title, description },
    { new: true }
  );

  return res.status(200).send({
    updatedPublication,
  });
}

// ----- Exports -----

module.exports = {
  newPublication,
  editPublication,
};
