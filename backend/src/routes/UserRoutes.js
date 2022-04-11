const express = require("express");
const Auth = require("../middlewares/Auth");
const router = express.Router();
const {
  Register,
  Login,
  allAdminUsers,
  deleteUser,
  signOff,
  editUsername,
  uploadAvatar,
  getImage
} = require("../controllers/UserController");

router.post("/register", Register);

router.post("/login", Login);

router.get("/all-admin-users", Auth, allAdminUsers);

router.delete("/delete-user/:id", Auth, deleteUser);

router.post("/sign-off", Auth, signOff);

router.put("/edit-username/:id?", Auth, editUsername);

router.post("/upload/:id?", uploadAvatar);

router.get("/get-image/:image", getImage);

module.exports = router;
