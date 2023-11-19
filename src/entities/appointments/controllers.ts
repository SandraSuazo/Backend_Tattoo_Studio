import { Session } from "./model.js";
import { getUserById, formatTime, getSessionById } from "../../core/helpers.js";

export const createSession = async (userId, newDate, next) => {
  const user = await getUserById(userId, next);
  let customerField = user.role === "customer" ? userId : newDate.customer;
  let artistField =
    user.role === "tattooArtist" ? userId : newDate.tattooArtist;
  const formattedStartTime = formatTime(newDate.startTime, next);
  const formattedEndTime = formatTime(newDate.endTime, next);
  if (!formattedStartTime || !formattedEndTime) {
    throw new Error(next("MISSING_REQUIRED_FIELDS"));
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
  const fullSession = await Session.findById(session._id)
    .populate("customer", "name surname phone")
    .populate("tattooArtist", "name surname phone");
  return fullSession;
};

export const findSession = async (sessionId, next) => {
  const session = await getSessionById(sessionId, next);
  session.populate("customer", "name surname phone");
  session.populate("tattooArtist", "name surname phone");
  return session;
};

export const updateSession = async (userId, sessionId, updatedData, next) => {};

export const deactivateSession = async (userId, role, sessionId, next) => {
  const session = await getSessionById(sessionId, next);
  if (
    (role === "customer" && session[role] !== userId) ||
    (role === "tattooArtist" && session[role] !== userId)
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
  });
  if (!sessions) {
    throw new Error(next("NO_PENDING_SESSIONS"));
  }
  return sessions;
};
