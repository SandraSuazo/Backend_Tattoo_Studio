export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    next("ACCESS_DENIED");
  }
  next();
};
