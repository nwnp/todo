import { Request, Response } from "express";
import {
  ICountResult,
  IResult,
  IUserResult,
} from "../../interfaces/user.interface";
import { UserRepository } from "../../repositories/user.repository";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

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

  signup = async (req: Request, res: Response) => {
    const { userId, password, email, name, nickname } = req.body;

    if (
      userId.trim().length === 0 ||
      password.trim().length === 0 ||
      email.trim().length === 0 ||
      name.trim().length === 0 ||
      nickname.trim().length === 0
    ) {
      return res.status(400).json({
        result: 0,
        message: "Id or Password or Email or Name is Empty",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        result: 0,
        message: "Email is Invalid",
      });
    }

    const isExist = await this.userRepository.getUserByUserId(userId);
    if (isExist.count > 0) {
      return res.status(401).json({
        result: 0,
        message: "Exist User",
      });
    }
  };
}
