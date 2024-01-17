const express = require("express");
const TeamController = require("../controllers/TeamController");
const router = express.Router();
const { validateToken, isAuth } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(validateToken, TeamController.createTeamMember)
  .get(validateToken, TeamController.getTeamMembers);

router
  .route("/:id")
  .put(validateToken, TeamController.updateTeamMember)

module.exports = router;
