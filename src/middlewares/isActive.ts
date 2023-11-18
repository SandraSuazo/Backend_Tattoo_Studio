export const isActive = (req, res, next) => {
  if (req.user.isActive !== true) {
    next("DISABLE_USER");
  }
  next();
};
