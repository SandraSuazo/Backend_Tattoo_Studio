import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./model.js";
import { CONFIG } from "../../core/config.js";
import {
  registrationFields,
  getUserById,
  validateRole,
} from "../../core/helpers.js";

export const createUser = async (newUser, next) => {
  const missingFields = registrationFields.filter((field) => !newUser[field]);
  if (missingFields.length > 0) {
    throw new Error(next("MISSING_REQUIRED_FIELDS"));
  }
  const user = await User.findOne({ email: newUser.email });
  if (user) {
    throw new Error(next("USER_ALREADY_EXISTS"));
  } else {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(newUser.password)) {
      throw new Error(next("INVALID_PASSWORD_FORMAT"));
    }
    newUser.password = await bcrypt.hash(newUser.password, CONFIG.HASH_ROUNDS);
    newUser.role = "customer";
    newUser.isActive = true;
  }
  await User.create(newUser);
  return newUser;
};

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

export const profileUser = async (userId, next) => {
  const user = await getUserById(userId, next);
  const userProfile = {};
  for (const field of registrationFields) {
    userProfile[field] = user[field];
  }
  return userProfile;
};

export const updateProfile = async (userId, updatedData, next) => {
  const user = await getUserById(userId, next);
  const modifiedFields = {};
  for (const field of registrationFields) {
    if (field === "password" && updatedData[field] !== undefined) {
      updatedData[field] = await bcrypt.hash(
        updatedData[field],
        CONFIG.HASH_ROUNDS
      );
    } else if (updatedData[field] !== user[field]) {
      user[field] = updatedData[field];
      modifiedFields[field] = user[field];
    }
  }
  if (Object.keys(modifiedFields).length === 0) {
    throw new Error(next("NO_FIELD_MODIFIED"));
  }
  await user.save();
  return modifiedFields;
};

export const changeRole = async (userId, newRole, next) => {
  validateRole(newRole, next);
  const user = await User.findByIdAndUpdate(userId, { role: newRole });
  getUserById(user, next);
  return `A new ${newRole} has been created`;
};

export const deactivateUser = async (userId, next) => {
  getUserById(userId, next);
  const user = await User.findByIdAndUpdate(userId, { isActive: false });
  return `User with ID ${userId} has been deactivated.`;
};

export const listUsers = async (role, next) => {
  validateRole(role, next);
  const users = await User.find({ role, isActive: true });
  return users;
};
