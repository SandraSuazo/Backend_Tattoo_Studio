import { User } from "../entities/users/model.js";

/* Array de los campos requeridos a rellenar por el usuario */
export const registrationUsers = [
  "name",
  "surname",
  "address",
  "phone",
  "email",
  "password",
];

/* Array de los campos requeridos a rellenar en las citas */
export const registrationDates = [
  "startAt",
  "endAt",
  "intervention",
  "customer",
  "tattooArtist",
  "invoice",
];

/* Función para buscar un usuario por su Id y comprobar que existe */
export const getUserById = async (userId, next) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  return user;
};

/* Función para comprobar si el role axiste */
export const validateRole = (role, next) => {
  const validRoles = ["admin", "customer", "tattooArtist"];
  if (!validRoles.includes(role)) {
    throw new Error(next("INVALID_ROLE"));
  }
};
