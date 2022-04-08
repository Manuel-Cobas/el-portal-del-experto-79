const {
  newPublication,
  editPublication,
  deletePublication,
  allMyPublications,
  allAdminPublications,
} = require("../controllers/PublicationController");
const express = require("express");
const Auth = require("../middlewares/Auth");
const router = express.Router();

router.post("/new-publication", Auth, newPublication);

router.put("/edit-publication/:id", Auth, editPublication);

router.get("/all-my-publications", Auth, allMyPublications);

router.get("/all-admin-publications", Auth, allAdminPublications);

router.delete("/delete-publication/:id", Auth, deletePublication);

module.exports = router;
