import { Session } from "./model.js";
import {
  registrationSession,
  getUserById,
  formatTime,
  getSessionById,
} from "../../core/helpers.js";

/* Crear una cita */
export const createSession = async (userId, newDate, next) => {
  const user = await getUserById(userId, next);

  const missingFields = registrationSession.filter((field) => !newDate[field]);
  if (missingFields.length > 1) {
    throw new Error(next("MISSING_REQUIRED_FIELDS"));
  }

  if (
    (user.role === "customer" && !newDate.tattooArtist) ||
    (user.role === "tattooArtist" && !newDate.customer)
  ) {
    throw new Error(next("INVALID_SESSION_PARTICIPANTS"));
  }

  let customerField = user.role === "customer" ? userId : newDate.customer;
  let artistField =
    user.role === "tattooArtist" ? userId : newDate.tattooArtist;

  const formattedStartTime = formatTime(newDate.startTime, next);
  const formattedEndTime = formatTime(newDate.endTime, next);
  if (formattedStartTime > formattedEndTime) {
    throw new Error(next("INVALID_TIME"));
  }

  const existingSession = await Session.findOne({
    date: newDate.date,
    startTime: { $lte: newDate.endTime },
    endTime: { $gte: newDate.startTime },
  });
  if (existingSession) {
    throw new Error(next("BUSY_SESSION"));
  }

  const currentDate = new Date();
  const selectedDate = new Date(newDate.date);
  if (selectedDate < currentDate) {
    throw new Error(next("INVALID_DATE"));
  }

  const session = new Session({
    ...newDate,
    startTime: formattedStartTime,
    endTime: formattedEndTime,
    customer: customerField,
    tattooArtist: artistField,
  });
  await session.save();

  const fullSession = await getSessionById(session._id, next);
  return fullSession;
};

/* Listar todas las citas */
export const listSession = async (userId, next) => {
  const sessions = await Session.find({
    $or: [{ customer: userId }, { tattooArtist: userId }],
  });
  if (sessions.length === 0) {
    throw new Error(next("NO_PENDING_SESSIONS"));
  }
  return sessions;
};

/* Buscar una cita */
export const findSession = async (sessionId, next) => {
  const session = await getSessionById(sessionId, next);
  return session;
};

/* Modificar una cita */
export const modifySession = async (userId, sessionId, updatedData, next) => {
  await deleteSession(userId, sessionId, next);
  const newSession = await createSession(userId, updatedData, next);
  return newSession;
};

/* Eliminar una cita */
export const deleteSession = async (userId, sessionId, next) => {
  const session = await getSessionById(sessionId, next);
  if (
    session.customer._id.toString() !== userId &&
    session.tattooArtist._id.toString() !== userId
  ) {
    throw new Error(next("ACCESS_DENIED"));
  }
  await Session.deleteOne({ _id: sessionId });
  return "Session deleted successfully.";
};
