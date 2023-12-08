import express from "express";
import { auth } from "../../middlewares/auth.js";
import { isActive } from "../../middlewares/isActive.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import {
  createSession,
  listSession,
  deleteSession,
  findSession,
  modifySession,
  listAllSessions,
} from "./controllers.js";

const router = express.Router();

router.post("/", auth, isActive, async (req, res, next) => {
  const userId = (req as any).user.userId;
  const newSession = req.body;
  try {
    res.json(await createSession(userId, newSession, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.get("/list", auth, isActive, async (req, res, next) => {
  try {
    const userId = (req as any).user.userId;
    res.json(await listSession(userId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.get(
  "/list-all-appointment",
  auth,
  isActive,
  isAdmin,
  async (req, res, next) => {
    try {
      res.json(await listAllSessions(next));
    } catch (error) {
      next("INTERNAL_SERVER_ERROR");
    }
  }
);

router.get("/:sessionId", auth, isActive, isAdmin, async (req, res, next) => {
  const sessionId = req.params.sessionId;
  try {
    res.json(await findSession(sessionId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.patch(
  "/update-session/:sessionId",
  auth,
  isActive,
  async (req, res, next) => {
    const userId = (req as any).user.userId;
    const sessionId = req.params.sessionId;
    const updatedData = req.body;
    try {
      res.json(await modifySession(userId, sessionId, updatedData, next));
    } catch (error) {
      next("INTERNAL_SERVER_ERROR");
    }
  }
);

router.delete("/delete/:sessionId", auth, isActive, async (req, res, next) => {
  const userId = (req as any).user.userId;
  const sessionId = req.params.sessionId;
  try {
    res.json(await deleteSession(userId, sessionId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

export default router;
