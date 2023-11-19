import express from "express";
import { auth } from "../../middlewares/auth.js";
import { isActive } from "../../middlewares/isActive.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import {
  createSession,
  deactivateSession,
  findSession,
  listSession,
  updateSession,
} from "./controllers.js";

export const sessionRouter = express.Router();

sessionRouter.post("/", auth, isActive, async (req, res, next) => {
  const userId = (req as any).user.userId;
  const newSession = req.body;
  try {
    res.json(await createSession(userId, newSession, next));
  } catch (error) {
    console.log(error);
    next("INTERNAL_SERVER_ERROR");
  }
});

sessionRouter.get(
  "/:sessionId",
  auth,
  isActive,
  isAdmin,
  async (req, res, next) => {
    const sessionId = req.params.sessionId;
    try {
      res.json(await findSession(sessionId, next));
    } catch (error) {
      console.log(error);
      next("INTERNAL_SERVER_ERROR");
    }
  }
);

sessionRouter.patch(
  "/update-session/:sessionId",
  auth,
  isActive,
  async (req, res, next) => {
    const userId = (req as any).user.userId;
    const sessionId = req.params.sessionId;
    const updatedData = req.body;
    try {
      res.json(await updateSession(userId, sessionId, updatedData, next));
    } catch (error) {
      console.log(error);
      next("INTERNAL_SERVER_ERROR");
    }
  }
);

sessionRouter.patch(
  "/deactivate/:sessionId",
  auth,
  isActive,
  async (req, res, next) => {
    const userId = (req as any).user.userId;
    const role = (req as any).user.role;
    const sessionId = req.params.sessionId;
    try {
      res.json(await deactivateSession(userId, role, sessionId, next));
    } catch (error) {
      next("INTERNAL_SERVER_ERROR");
    }
  }
);

sessionRouter.get("/list", auth, isActive, async (req, res, next) => {
  const userId = (req as any).user.userId;
  try {
    res.json(await listSession(userId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});
