import express from "express";
import { auth } from "../../middlewares/auth.js";
import { isActive } from "../../middlewares/isActive.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import {
  createUser,
  loginUser,
  profileUser,
  updateProfile,
  changeRole,
  deactivateUser,
  listUsers,
} from "./controllers.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const newUser = req.body;
  try {
    res.json(await createUser(newUser, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    res.json(await loginUser({ email, password }, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.get("/profile", auth, isActive, async (req, res, next) => {
  const userId = (req as any).user.userId;
  try {
    res.json(await profileUser(userId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.patch("/update-profile", auth, isActive, async (req, res, next) => {
  const userId = (req as any).user.userId;
  const updatedData = req.body;
  try {
    res.json(await updateProfile(userId, updatedData, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.delete("/deactivate/:userId", auth, isActive, async (req, res, next) => {
  const userId = req.params.userId;
  console.log("Deleting user with ID:", userId);
  try {
    res.json(await deactivateUser(userId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.patch(
  "/change-role/:userId",
  auth,
  isActive,
  isAdmin,
  async (req, res, next) => {
    const userId = req.params.userId;
    const newRole = req.body.newRole;
    try {
      res.json(await changeRole(userId, newRole, next));
    } catch (error) {
      next("INTERNAL_SERVER_ERROR");
    }
  }
);

router.get("/list/:role", auth, isActive, isAdmin, async (req, res, next) => {
  const role = req.params.role;
  try {
    res.json(await listUsers(role, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

export default router;
