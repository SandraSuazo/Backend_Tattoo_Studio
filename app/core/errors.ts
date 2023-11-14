const errorMessages = {
  INCORRECT_DATA: { code: 401, message: "Incorrect Data" },
  ACCESS_DENIED: { code: 403, message: "Access Denied" },
  NOT_FOUND: { code: 404, message: "User not found" },
  USER_NOT_CREATED: { code: 422, message: "User not created correctly" },
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
};

export const handleError = (res, errorCode) => {
  const error = errorMessages[errorCode];
  if (error) {
    res.status(error.code).json(error.message);
  } else {
    res.status(500).json("Unknown Error");
  }
};
/*
export const errorHandler = (err, req, res, next) => {
  // Manejo de errores específicos
  if (err.name === "UnauthorizedError") {
    return handleError(res, "UNAUTHORIZED");
  }

  // Manejo de otros errores
  return handleError(res, "INTERNAL_SERVER_ERROR");
};
*/
