const express = require("express");
const PublicationController = require("../controllers/PublicationController");
const Auth = require("../middlewares/Auth");
const router = express.Router();

router.post("/new-publication", Auth, PublicationController.newPublication);

router.put("/edit-publication/:id", Auth, PublicationController.editPublication);

module.exports = router;
