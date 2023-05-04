import { Response, Request, NextFunction } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  // return when token is not exist
  if (!token) {
    return res.status(404).json({
      status: 4,
      message: "Unauthorization",
    });
  }

  // return when not bearer token
  if (!token.startsWith("Bearer ")) {
    return res.status(404).json({
      status: 4,
      message: "Unauthorization",
    });
  }

  // return when token is not valid
  const tokenValue = token.split(" ")[1];
  if (tokenValue !== "1234") {
    return res.status(404).json({
      status: 4,
      message: "Unauthorization",
    });
  }

  next();
};
