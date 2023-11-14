import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { CONFIG } from "./core/config.js";
import { userRouter } from "./entities/users/routes.js";
import { auth } from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errors.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use(auth);

app.listen(CONFIG.PORT, () =>
  console.log(`Server listening on port ${CONFIG.PORT}`)
);
app.use(errorHandler);
mongoose
  .connect(CONFIG.DB_URL)
  .then(() => console.log("Connected to the database"))
  .catch(() => console.log("Failed to connect to the database:"));
