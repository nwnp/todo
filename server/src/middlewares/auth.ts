import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const USER = {
  id: "fakeid",
  password: "fakepassword",
  email: "fakeemail",
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(404).json({
      result: "1",
      message: "need to Bearer Token in Header",
    });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(404).json({
      result: "1",
      message: "need to Bearer Token in Header",
    });
  }

  const tokenValue = token.split(" ")[1];
  jwt.verify(
    tokenValue,
    process.env.JWT_SECRET as string,
    async (err, decoded) => {
      if (err) {
        return res.status(404).json({
          result: "1",
          message: "Authentication Error",
        });
      }

      const user = jwt.verify(
        tokenValue,
        process.env.JWT_SECRET as string
      ) as typeof USER;
      if (user.id !== USER.id) {
        return res.status(404).json({
          result: "1",
          message: "Authentication Error",
        });
      }

      next();
    }
  );
};
