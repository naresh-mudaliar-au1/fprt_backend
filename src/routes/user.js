import express from "express";
import { userController, blogController } from "../controllers";
import auth from "../middleware/auth";

export default express
  .Router()
  .post("/user/signup", userController.signup)
  .post("/user/login", userController.login)
  .post("/user/updatePass", auth, userController.updatePassword)
  .post("/user/follow", auth, userController.followUser)
  .post("/blog/post", auth, blogController.postBlog)
  .post("/blog/update", blogController.updateBlog);
