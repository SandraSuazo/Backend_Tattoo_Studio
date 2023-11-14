import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 20 },
    surname: { type: String, required: true, minlength: 2, maxlength: 20 },
    birthdate: { type: Date, required: true },
    address: { type: String, require: false, minlength: 2, maxlength: 100 },
    phone: { type: Number, required: false, unique: true, minlength: 9 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true, select: false, minlength: 8 },
    role: {
      type: String,
      enum: ["admin", "customer", "tattooArtist"],
      required: false,
    },
    isActive: { type: Boolean, required: true },
    isBusy: { type: Boolean, required: true },
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
        required: false,
      },
    ],
  },

  { versionKey: false, timestamps: true }
);

export const User = mongoose.model("User", userSchema);
