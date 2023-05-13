import { IUserResult } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  // TODO: client domain으로 redirect 시키기
  const userRepository = new UserRepository();
  const user: IUserResult = await userRepository.getUserById(1);

  if (!user) {
    return res.status(404).json({
      message: "Not Founded User",
    });
  }

  res.status(200).json(user);
});

export default router;
