import bcrypt from "bcrypt";
import { User } from "./model.js";
import { CONFIG } from "../../core/config.js";
import jwt from "jsonwebtoken";

export const createUser = async (user) => {
  user.password = await bcrypt.hash(user.password, CONFIG.HASH_ROUNDS);
  user.role = user.role !== "" ? user.role : "customer";
  await User.create(user);
  return user;
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
/*
export const profileUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const userProfile = {
      name: user.name,
      surname: user.surname,
      birthdate: user.birthdate,
      address: user.address,
      phone: user.phone,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      isBusy: user.isBusy,
      sessions: user.sessions,
    };

    return userProfile;
  } catch (error) {
    throw error;
  }
};*/
