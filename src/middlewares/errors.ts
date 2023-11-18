const errorMessages = {
  MISSING_REQUIRED_FIELDS: { code: 400, message: "Some fields are missing" },
  NO_FIELD_MODIFIED: { code: 400, message: "No field modified" },
  INVALID_ROLE: { code: 400, message: "Invalid role" },
  INCORRECT_PASSWORD: { code: 401, message: "Incorrect Password" },
  INVALID_PASSWORD_FORMAT: {
    code: 401,
    message:
      "The password must have at least 8 characters, a capital letter, a number and a special character",
  },
  INCOMPLETE_CREDENTIALS: { code: 401, message: "Incomplete Credentials" },
  TOKEN_NOT_PROVIDED: { code: 401, message: "Token Not Provided" },
  ACCESS_DENIED: { code: 403, message: "Access Denied" },
  DISABLE_USER: { code: 403, message: "Disable user" },
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
