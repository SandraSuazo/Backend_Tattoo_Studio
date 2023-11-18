import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
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
    isActive: { type: Boolean, required: true },
  },

  { versionKey: false, timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);
