import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    intervention: {
      type: String,
      enum: ["tattoo", "piercing"],
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tattooArtist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);
