import { Router, Request, Response } from "express";
import UserController from "../controllers/User.controller";

const userRoutes = Router();

userRoutes.post('/', UserController.store);

export { userRoutes }