import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema({
  startAt: { type: Number, required: true },
  endAt: { type: Number, required: true },
  intervention: {
    type: String,
    enum: ["tattoo", "piercing"],
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  tattooArtist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  invoice: { type: Number, required: false },
});

export const Session = mongoose.model("Session", sessionSchema);
