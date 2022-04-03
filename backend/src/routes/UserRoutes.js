const express = require("express");
const UserController = require("../controllers/UserController");
const Auth = require("../middlewares/Auth");
const router = express.Router();

router.post("/register", UserController.Register);

router.post("/login", UserController.Login);

router.get("/all-admin-users", Auth, UserController.allAdminUsers);

router.delete("/delete-user/:id", Auth, UserController.deleteUser);

router.post("/sign-off", Auth, UserController.signOff);

module.exports = router;
