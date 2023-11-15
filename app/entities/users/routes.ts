import express from "express";
import { createUser, loginUser, profileUser } from "./controllers.js";
import { auth } from "../../middlewares/auth.js";

export const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    res.json(await createUser(req.body, next));
  } catch (error) {
    next("USER_ALREADY_EXISTS");
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
  try {
    res.json(await profileUser((req as any).user.userId));
  } catch (error) {
    next("USER_NOT_FOUND");
  }
});
