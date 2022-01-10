import express from "express";
import dotenv from "dotenv-safe";

import { router } from "./routes";

import { createConnection } from "typeorm";

dotenv.config();

createConnection();

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta 👉 ${PORT}`);
});