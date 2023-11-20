import { Session } from "./model.js";
import {
  registrationSession,
  getUserById,
  formatTime,
  getSessionById,
} from "../../core/helpers.js";

export const createSession = async (userId, newDate, next) => {
  const user = await getUserById(userId, next);
  const missingFields = registrationSession.filter((field) => !newDate[field]);
  if (missingFields.length > 1) {
    throw new Error(next("MISSING_REQUIRED_FIELDS"));
  }
  if (user.role === "tattooArtist" && user._id === newDate.customer) {
    throw new Error(next("INCOMPLETE_CREDENTIALS"));
  }
  let customerField = user.role === "customer" ? userId : newDate.customer;
  let artistField =
    user.role === "tattooArtist" ? userId : newDate.tattooArtist;
  const formattedStartTime = formatTime(newDate.startTime, next);
  const formattedEndTime = formatTime(newDate.endTime, next);
  if (!formattedStartTime || !formattedEndTime) {
    throw new Error(next("INVALID_TIME_FORMAT"));
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
    isActive: true,
  });
  await session.save();
  const fullSession = await getSessionById(session._id, next);
  return fullSession;
};

export const findSession = async (sessionId, next) => {
  const session = await getSessionById(sessionId, next);
  return session;
};

export const updateSession = async (userId, sessionId, updatedData, next) => {
  const user = await getUserById(userId, next);
  const session = await getSessionById(sessionId, next);
  session.isActive = false;
  await createSession(userId, updatedData, next);
  for (const field in updatedData) {
    if (!registrationSession.includes(field)) {
      throw new Error(next("ACCESS_DENIED"));
    }
    if (field === "startTime" || field === "endTime") {
      const formattedTime = formatTime(updatedData[field], next);
      if (!formattedTime) {
        throw new Error(next("INVALID_TIME_FORMAT"));
      }
      session[field] = formattedTime;
    } else {
      session[field] = updatedData[field];
    }
  }
  await session.save();
  const updatedSession = await getSessionById(session._id, next);
  return updatedSession;
};

export const deactivateSession = async (userId, role, sessionId, next) => {
  const session = await getSessionById(sessionId, next);
  if (
    (role === "customer" && session.customer.toString() !== userId) ||
    (role === "tattooArtist" && session.tattooArtist.toString() !== userId)
  ) {
    throw new Error(next("ACCESS_DENIED"));
  }
  session.isActive = false;
  await session.save();
  return session;
};

export const listSession = async (userId, next) => {
  const sessions = await Session.find({
    $or: [{ customer: userId }, { tattooArtist: userId }],
    isActive: true,
  })
    .populate("customer", "name surname phone")
    .populate("tattooArtist", "name surname phone");
  if (sessions.length === 0) {
    throw new Error(next("NO_PENDING_SESSIONS"));
  }
  return sessions;
};
