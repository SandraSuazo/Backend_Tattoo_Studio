const errorMessages = {
  MISSING_REQUIRED_FIELDS: { code: 400, message: "Some fields are missing" },
  INCORRECT_PASSWORD: { code: 401, message: "Incorrect Password" },
  INCOMPLETE_CREDENTIALS: { code: 401, message: "Incomplete Credentials" },
  TOKEN_NOT_PROVIDED: { code: 401, message: "Token Not Provided" },
  ACCESS_DENIED: { code: 403, message: "Access Denied" },
  USER_NOT_FOUND: { code: 404, message: "User not found" },
  USER_ALREADY_EXISTS: { code: 422, message: "User already exists" },
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
};

export const errorHandler = (err, req, res, next) => {
  const error = errorMessages[err];
  if (error) {
    res.status(error.code).json(error.message);
  } else {
    res.status(500).json("Unknown Error");
  }
  next(err);
};
