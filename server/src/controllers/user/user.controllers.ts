import { Request, Response } from "express";
import { IUserResult } from "../../interfaces/user";
import { UserRepository } from "../../repositories/user.repository";
import bcrypt from "bcrypt";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getUser = async (userIdx: number) => {};

  login = async (req: Request, res: Response) => {
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

    const isExist: IUserResult = await this.userRepository.getUserById(userId);
    if (!isExist.user.length) {
      return res.status(404).json({
        result: 0,
        message: "Not Founded User",
      });
    }

    const isMatch = bcrypt.compareSync(password, isExist.user[0].password);
    if (!isMatch) {
      return res.status(401).json({
        result: 0,
        message: "Id or Password is Not Matched",
      });
    }

    if (isExist.user[0].isUse === "N") {
      return res.status(401).json({
        result: 0,
        message: "Stopped User",
      });
    }

    if (isExist.user[0].isDel === "Y") {
      return res.status(401).json({
        result: 0,
        message: "Deleted or Banned User",
      });
    }

    res.status(200).json({
      result: 1,
      message: "Login Success",
    });
  };

  signup = async (req: Request, res: Response) => {};
}
