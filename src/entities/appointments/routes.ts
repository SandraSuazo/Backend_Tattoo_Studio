import express from "express";
import { auth } from "../../middlewares/auth.js";
import { createDates } from "./controllers.js";

export const sessionRouter = express.Router();

sessionRouter.post("/", auth, async (req, res, next) => {
  const userId = (req as any).user.userId;
  const newDate = req.body;
  try {
    res.json(await createDates(userId, newDate, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});
