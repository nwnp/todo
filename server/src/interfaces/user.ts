import { RowDataPacket } from "mysql2";

export interface IUserResult {
  user: RowDataPacket[];
  result: number;
}

export interface IResult {
  result: number;
}
