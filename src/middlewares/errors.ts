const errorMessages = {
  MISSING_REQUIRED_FIELDS: { code: 400, message: "Some fields are missing" },
  NO_FIELD_MODIFIED: { code: 400, message: "No field modified" },
  INVALID_ROLE: { code: 400, message: "Invalid role" },
  INVALID_DATE: { code: 400, message: "Invalid date" },
  INVALID_TIME: { code: 400, message: "Invalid time" },
  INVALID_SESSION_PARTICIPANTS: {
    code: 400,
    message: "Invalid session participants",
  },
  MAX_TATTOO_ARTISTS_REACHED: {
    code: 400,
    message: "Max Tattoo Artist Reached",
  },
  INCORRECT_PASSWORD: { code: 401, message: "Incorrect Password" },
  INVALID_PASSWORD_FORMAT: {
    code: 401,
    message:
      "The password must have at least 8 characters, a capital letter, a number and a special character",
  },
  INVALID_EMAIL_FORMAT: {
    code: 401,
    message: "The email format is not correct",
  },
  INCOMPLETE_CREDENTIALS: { code: 401, message: "Incomplete Credentials" },
  TOKEN_NOT_PROVIDED: { code: 401, message: "Token Not Provided" },
  ACCESS_DENIED: { code: 403, message: "Access Denied" },
  DISABLED_USER: { code: 403, message: "Disabled user" },
  ESTABLISHMENT_CLOSED: {
    code: 403,
    message: "The establishment is open from 9:00 to 21:00",
  },
  BUSY_SESSION: { code: 403, message: "Busy session" },
  USER_NOT_FOUND: { code: 404, message: "User not found" },
  SESSION_NOT_FOUND: { code: 404, message: "Session not found" },
  NO_PENDING_SESSIONS: { code: 404, message: "You have no pending sessions" },
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
