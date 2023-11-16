import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./model.js";
import { CONFIG } from "../../core/config.js";
import { getUserById, registrationFields } from "../../core/helpers.js";

export const createUser = async (newUser, next) => {
  const missingFields = registrationFields.filter((field) => !newUser[field]);
  if (missingFields.length > 0) {
    throw new Error(next("MISSING_REQUIRED_FIELDS"));
  }
  const user = await User.findOne({ email: newUser.email });
  if (user) {
    throw new Error(next("USER_ALREADY_EXISTS"));
  } else {
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
  const token = jwt.sign({ userId: user._id, role: user.role }, CONFIG.SECRET, {
    expiresIn: "24h",
  });
  return { token };
};

export const profileUser = async (userId, next) => {
  const user = await getUserById(userId, next);
  const userProfile = registrationFields.reduce((profile, field) => {
    profile[field] = user[field];
    return profile;
  }, {});
  return userProfile;
};

export const updateProfile = async (userId, updatedData, next) => {
  const user = await getUserById(userId, next);
  const modifiedFields = {};

  for (const field of registrationFields) {
    if (
      updatedData[field] !== undefined &&
      updatedData[field] !== user[field]
    ) {
      if (field === "password" && updatedData[field] !== user[field]) {
        user[field] = await bcrypt.hash(updatedData[field], CONFIG.HASH_ROUNDS);
      } else {
        user[field] = updatedData[field];
      }
      modifiedFields[field] = user[field];
    }
  }
  await user.save();
  return modifiedFields;
};
