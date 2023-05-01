import { Response, Request, NextFunction } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(404).json({
      result: "1",
      message: "need to Bearer Token in Header",
    });
  }

  next();
};
