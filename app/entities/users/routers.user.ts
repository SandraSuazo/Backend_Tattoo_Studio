import express from "express";
import {
  createUser,
  loginUser,
  profileUser,
  //modifyUser,
  //removeUser,
} from "./controllers.user.js";
import { auth } from "../../middlewares/verify.token.js";
import { handleError } from "../../core/errors.js";

export const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  try {
    res.json(await createUser(req.body));
  } catch (error) {
    handleError(res, "USER_NOT_CREATED");
  }
});

userRouter.post("/:login", async (req, res) => {
  const { email, password } = req.body;
  try {
    res.json(await loginUser({ email, password }));
  } catch (error) {
    handleError(res, "INCORRECT_DATA");
  }
});

userRouter.get("/:profile", auth, async (req, res) => {
  console.log("Profile from URL:", req.params.profile);
  console.log("User from Token:", (req as any).user.userId);
  if (req.params.profile !== (req as any).user.userId) {
    return handleError(res, "ACCESS_DENIED");
  }
  try {
    const userProfile = await profileUser((req as any).user.userId);
    res.json(userProfile);
  } catch (error) {
    handleError(res, "USER_NOT_FOUND");
  }
});
