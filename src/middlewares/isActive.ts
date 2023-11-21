export const isActive = (req, res, next) => {
  if (req.user.isActive !== true) {
    next("DISABLED_USER");
  }
  next();
};
