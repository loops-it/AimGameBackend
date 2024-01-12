const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const { validateToken, isAuth } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(validateToken, UserController.getTeamMembers);

module.exports = router;
