import { handleError } from "../core/errors";

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return handleError(res, "ACCESS_DENIED");
    }
    next();
  } catch (error) {
    return handleError(res, "INTERNAL_SERVER_ERROR");
  }
};
