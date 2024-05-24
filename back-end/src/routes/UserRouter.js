const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUSerMiddleWare,
} = require("../middleWare/authMiddleWare");
router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.delete("/delete-user/:id", authMiddleWare, UserController.deleteUser);
router.get("/get-all", authMiddleWare, UserController.getAllUser);
router.get(
  "/get-detail-user/:id",
  authUSerMiddleWare,
  UserController.getDetailUser
);
router.put("/update-user/:id", UserController.updateUser);
router.post("/refresh-token", UserController.refreshToken);
module.exports = router;
