const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controller/UserController.js");

const userController = new UserController();

UserRouter
  .get("/", userController.getAllUsers)
  .post("/createUser", userController.createUser)
  .get("/getByID", userController.getByID)
  .put("/updateUserByID", userController.updateUserByID)
  .delete("/deleteByID", userController.deleteByID)
  .post("/login", userController.login);

module.exports = UserRouter;
