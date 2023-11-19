import { User } from "../entities/users/model.js";

/* Array de los campos requeridos a rellenar por el usuario */
export const registrationFields = [
  "name",
  "surname",
  "address",
  "phone",
  "email",
  "password",
];

/* Función para buscar un usuario por su Id y comprobar que existe */
export const getUserById = async (userId, next) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  return user;
};

/* Función para comprobar si el role axiste y es valido */
export const validateRole = (role, next) => {
  const validRoles = ["admin", "customer", "tattooArtist"];
  if (!validRoles.includes(role)) {
    throw new Error(next("INVALID_ROLE"));
  }
  return role;
};

/* Función para verificar y transformar el formato de la hora en las citas */
export const formatTime = (timeString, next) => {
  const timeRegex = /^(0[9]|1\d|2[0-1]):[0-5]\d$/;
  if (!timeRegex.test(timeString)) {
    throw new Error(next("INVALID_TIME_FORMAT"));
  }
  const hour = parseInt(timeString.split(":")[0], 10);
  if (hour < 9 || hour > 20) {
    throw new Error(next("ESTABLISHMENT_CLOSED"));
  }
  const formattedTime = `${timeString}h`;
  return formattedTime;
};

/* Función para buscar una cita por su Id y comprobar que existe */
export const getSessionById = async (sessionId, next) => {
  const session = await User.findById(sessionId);
  if (!session) {
    throw new Error(next("SESSION_NOT_FOUND"));
  }
  return session;
};
