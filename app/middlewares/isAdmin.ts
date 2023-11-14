export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      next("ACCESS_DENIED");
    }
    next();
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
};
