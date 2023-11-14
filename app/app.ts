import express from "express";
import cors from "cors";
import { userRouter } from "./entities/users/routers.user.js";
import { auth } from "./middlewares/verify.token.js";
import { CONFIG } from "./core/config.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use(auth);

app.listen(CONFIG.PORT, () =>
  console.log(`Servidor levantado en el puerto ${CONFIG.PORT}`)
);

mongoose
  .connect(CONFIG.DB_URL)
  .then(() => console.log("Conectado a la base de datos"));
