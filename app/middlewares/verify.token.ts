import jwt from "jsonwebtoken";
import { CONFIG } from "../core/config.js";
import { handleError } from "../core/errors.js";

export const auth = (req, res, next) => {
  try {
    const containerToken = req.headers.authorization;
    if (!containerToken) {
      return handleError(res, "UNAUTHORIZED");
    }
    const token = containerToken.split(" ")[1];
    const decodedToken = jwt.verify(token, CONFIG.SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return handleError(res, "INTERNAL_SERVER_ERROR");
  }
};
