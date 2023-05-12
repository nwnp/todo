import { RowDataPacket } from "mysql2";
import pool from "../db/connection";
import { IResult, IUserResult } from "../interfaces/user";

export class UserRepository {
  constructor() {}

  async getUserById(userId: number): Promise<IUserResult | any> {
    const connection = await pool.getConnection();
    try {
      const sql = `
        select
          u_idx idx,
          user_id userId,
          nickname,
          email,
          password,
          is_use isUse,
          is_del isDel
        from user 
          where user_id = ?`;
      const [user] = await connection.execute<RowDataPacket[]>(sql, [userId]);
      return {
        result: 1,
        user,
      };
    } catch (error) {
      console.log(error);
      return {
        result: 0,
      };
    } finally {
      connection.release();
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    const connection = await pool.getConnection();
    try {
      const sql = `
        select
          u_idx idx,
          nickname,
          email,
          password,
          is_use isUse,
          is_del isDel
        from user 
          where email = ?`;
      const [user] = await connection.execute<RowDataPacket[]>(sql, [email]);
      return user[0];
    } catch (error) {
      console.log(error);
    } finally {
      connection.release();
    }
  }
}
