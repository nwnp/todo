import { UserController } from "../controllers/user/user.controllers";
import express, { Request, Response } from "express";

const router = express.Router();

export default function tweetsRouter(UserController: UserController) {
  router.post("/login", UserController.login);
}
