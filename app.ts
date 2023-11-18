import express from "express";
import cors from "cors";
import { connectDB } from "./src/db.js";
import { CONFIG } from "./src/core/config.js";
import { userRouter } from "./src/entities/users/routes.js";
import { sessionRouter } from "./src/entities/appointments/routes.js";
import { auth } from "./src/middlewares/auth.js";
import { errorHandler } from "./src/middlewares/errors.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/appointment", sessionRouter);
app.use(auth);

app.listen(CONFIG.PORT, () =>
  console.log(`Server listening on port ${CONFIG.PORT}`)
);
app.use(errorHandler);

connectDB();
