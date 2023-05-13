import { RowDataPacket } from "mysql2";

export interface IUserResult {
  user: RowDataPacket[];
  result: number;
}

export interface IResult {
  result: number;
}

export interface ICountResult {
  count: RowDataPacket;
}

export interface ICreateUser {
  userId: string;
  nickname: string;
  email: string;
  password: string;
}
