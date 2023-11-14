import express from "express";
import {
  createUser,
  loginUser,
  //profileUser
} from "./controllers.js";
import { auth } from "../../middlewares/auth.js";

export const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    res.json(await createUser(req.body));
  } catch (error) {
    next("USER_NOT_CREATED");
  }
});

userRouter.post("/:login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    res.json(await loginUser({ email, password }, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});
/*
userRouter.get("/:profile", auth, async (req, res, next) => {
  console.log("Profile from URL:", req.params.profile);
  console.log("User from Token:", (req as any).user.userId);
  if (req.params.profile !== (req as any).user.userId) {
    next("ACCESS_DENIED");
  }
  try {
    const userProfile = await profileUser((req as any).user.userId);
    res.json(userProfile);
  } catch (error) {
    next("USER_NOT_FOUND");
  }
});
*/
