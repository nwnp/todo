import { Request, Response } from "express";
import { UserRepository } from "./../../repositories/user.query";
import { IUserResult } from "../../interfaces/user";
import bcrypt from "bcrypt";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(userId: number) {}

  async login(req: Request, res: Response) {
    const { userId, password } = req.body;
    const sqlInjectionRegex = /[\s'";\\]/;

    if (userId.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        result: 0,
        message: "Id or Password is Empty",
      });
    }

    if (sqlInjectionRegex.test(userId) || sqlInjectionRegex.test(password)) {
      // TODO: IP 등록 후 차단
      return res.status(400).json({
        result: 0,
        message: "Id or Password is Invalid",
      });
    }

    if (userId.trim().length < 4 || password.trim().length < 4) {
      return res.status(400).json({
        result: 0,
        message: "Id or Password is Too Short",
      });
    }

    const user: IUserResult = await this.userRepository.getUserById(userId);
    if (!user.result) {
      return res.status(404).json({
        result: 0,
        message: "Not Founded User",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        result: 0,
        message: "Id or Password is Not Matched",
      });
    }

    // TODO: isUse, isDel checking

    res.status(200).json({
      result: 1,
      message: "Login Success",
    });
  }
}
