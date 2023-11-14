import jwt from "jsonwebtoken";
import { CONFIG } from "../core/config.js";

export const auth = (req, res, next) => {
  try {
    const containerToken = req.headers.authorization;
    if (!containerToken) {
      next("TOKEN_NOT_PROVIDED");
    }
    const token = containerToken.split(" ")[1];
    const decodedToken = jwt.verify(token, CONFIG.SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
};
