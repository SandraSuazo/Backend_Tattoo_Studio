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
