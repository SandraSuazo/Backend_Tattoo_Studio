import { Session } from "./model.js";
import { getUserById, registrationDates } from "../../core/helpers.js";

export const createDates = async (userId, newDate, next) => {
  const missingFields = registrationDates.filter((field) => !newDate[field]);
  if (missingFields.length > 1) {
    throw new Error(next("MISSING_REQUIRED_FIELDS"));
  }
  const user = await getUserById(userId, next);
  user._id = newDate.customer;
  console.log(user);
  await Session.create(newDate);
  return newDate;
};

/*
export const updateProfile = async (userId, updatedData, next) => {
  const user = await getUserById(userId, next);
  const modifiedFields = {};

  for (const field of registrationUsers) {
    if (
      updatedData[field] !== undefined &&
      updatedData[field] !== user[field]
    ) {
      if (field === "password" && updatedData[field] !== user[field]) {
        user[field] = await bcrypt.hash(updatedData[field], CONFIG.HASH_ROUNDS);
      } else {
        user[field] = updatedData[field];
      }
      modifiedFields[field] = user[field];
    }
  }
  await user.save();
  return modifiedFields;
};
*/
