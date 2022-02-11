import express from "express";
import dotenv from "dotenv-safe";
import morganBody from "morgan-body";
import fs from "fs";
import path from "path";
import moment from "moment";

import { router } from "./routes";

import "./database/connection";

dotenv.config();

const PORT = process.env.SERVER_PORT;

// instala o yup retardado

const log = fs.createWriteStream(
  path.join(__dirname, "./logs", `log${moment().format('YYYY-MM-DD_HH')}.log`), { flags: "a" }
);

const app = express();

app.use(express.json());

morganBody(app, {
  noColors: true,
  stream: log,
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta 👉 ${PORT}`);
});