import { Router } from "express";
import AuthController from "../controllers/Auth.Controller";

const authRoutes = Router();

authRoutes.post('/', AuthController.authenticate);

export { authRoutes }