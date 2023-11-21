import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./model.js";
import { CONFIG } from "../../core/config.js";
import {
  registrationFields,
  getUserById,
  validateRole,
  validateEmail,
  validatePassword,
} from "../../core/helpers.js";

/* Crear usuarios */
export const createUser = async (newUser, next) => {
  const missingFields = registrationFields.filter((field) => !newUser[field]);
  if (missingFields.length > 0) {
    throw new Error(next("MISSING_REQUIRED_FIELDS"));
  }
  const user = await User.findOne({ email: newUser.email });
  if (user) {
    throw new Error(next("USER_ALREADY_EXISTS"));
  } else {
    validateEmail(newUser.email, next);
    validatePassword(newUser.password, next);
    newUser.password = await bcrypt.hash(newUser.password, CONFIG.HASH_ROUNDS);
    newUser.role = "customer";
    newUser.isActive = true;
  }
  await User.create(newUser);
  return newUser;
};

/* Login usuarios */
export const loginUser = async ({ email, password }, next) => {
  if (!email || !password) {
    throw new Error(next("INCOMPLETE_CREDENTIALS"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error(next("INCORRECT_PASSWORD"));
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role, isActive: user.isActive },
    CONFIG.SECRET,
    {
      expiresIn: "24h",
    }
  );
  return { token };
};

/* Perfil de un usuario */
export const profileUser = async (userId, next) => {
  const user = await getUserById(userId, next);
  const userProfile = {};
  for (const field of registrationFields) {
    userProfile[field] = user[field];
  }
  return userProfile;
};

/* Actualizar datos de un usuario */
export const updateProfile = async (userId, updatedData, next) => {
  const user = await getUserById(userId, next);
  let fieldModified = false;
  const newDataUser = {};
  for (const field in updatedData) {
    if (!registrationFields.includes(field)) {
      throw new Error(next("ACCESS_DENIED"));
    }
    if (field === "email" && updatedData[field] !== undefined) {
      validateEmail(updatedData.email, next);
    }
    if (field === "password" && updatedData[field] !== undefined) {
      validatePassword(updatedData.password, next);
      const hashedPassword = await bcrypt.hash(
        updatedData["password"],
        CONFIG.HASH_ROUNDS
      );
      user.password = hashedPassword;
      newDataUser["password"] = user.password;
      fieldModified = true;
    } else if (updatedData[field] !== undefined) {
      user[field] = updatedData[field];
      newDataUser[field] = user[field];
      fieldModified = true;
    }
  }
  if (!fieldModified) {
    throw new Error(next("NO_FIELD_MODIFIED"));
  }
  await user.save();
  return newDataUser;
};

/* Crear "admin" o "tattooArtist" */
export const changeRole = async (userId, newRole, next) => {
  validateRole(newRole, next);
  const user = await getUserById(userId, next);
  user.role = newRole;
  await user.save();
  return user;
};

/* Desactivar usuarios */
export const deactivateUser = async (userId, next) => {
  const user = await getUserById(userId, next);
  user.isActive = false;
  await user.save();
  return user;
};

/* Listar los usuarios según su rol */
export const listUsers = async (role, next) => {
  validateRole(role, next);
  const users = await User.find({ role, isActive: true });
  return users;
};
