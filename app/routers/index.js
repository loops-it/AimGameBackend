const express = require("express");
const router = express.Router();
const workspaceRouter = require("./workspaceRouter");
const industryTypeRouter = require("./industryTypeRouter");
const clientRouter = require("./clientRouter");
const funnelStatusRouter = require("./funnelStatusRouter");
const userRouter = require("./userRouter");
const workspaceUser = require("./workspaceUserRouter");
const authRouter = require("./authRouter");
const partner = require("./partnerRouter");
const opportunity = require("./opportunityRouter");
const clientOrganizations = require("./clientOrganizationRouter");
const tasks = require("./taskRouter");
const teamMembers = require("./teamMembersRouter");

router.use("/workspaces", workspaceRouter);
router.use("/industryTypes", industryTypeRouter);
router.use("/clients", clientRouter);
router.use("/funnelStatuses", funnelStatusRouter);
router.use("/users", userRouter);
router.use("/workspaceUsers", workspaceUser);
router.use("/auth", authRouter);
router.use("/partners", partner);
router.use("/opportunities", opportunity);
router.use("/client-organizations", clientOrganizations);
router.use("/tasks", tasks);

module.exports = router;
