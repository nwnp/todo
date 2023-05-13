import express, { Request, Response } from "express";
import { UserController } from "../controllers/user/user.controllers";
import { UserRepository } from "../repositories/user.repository";

const router = express.Router();
const userController: UserController = new UserController(new UserRepository());

router.post("/login", userController.login);
router.post("/signup", userController.signup);

export default router;
