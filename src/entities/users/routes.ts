import express from "express";
import {
  createUser,
  loginUser,
  profileUser,
  updateProfile,
} from "./controllers.js";
import { auth } from "../../middlewares/auth.js";

export const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  const newUser = req.body;
  try {
    res.json(await createUser(newUser, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    res.json(await loginUser({ email, password }, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

userRouter.get("/profile", auth, async (req, res, next) => {
  const userId = (req as any).user.userId;
  try {
    res.json(await profileUser(userId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

userRouter.patch("/change-profile", auth, async (req, res, next) => {
  const userId = (req as any).user.userId;
  const updatedData = req.body;
  try {
    res.json(await updateProfile(userId, updatedData, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});
