import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 20 },
    surname: { type: String, required: true, minlength: 2, maxlength: 20 },
    phone: { type: Number, required: true, unique: true, minlength: 9 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true, select: false, maxlenght: 15 },
    role: {
      type: String,
      enum: ["admin", "customer", "tattooArtist"],
      required: true,
    },
    isActive: { type: Boolean, required: true },
  },

  { versionKey: false, timestamps: true }
);

export const User = mongoose.model("User", userSchema);
