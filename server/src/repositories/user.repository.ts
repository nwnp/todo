import { RowDataPacket } from "mysql2";
import pool from "../db/connection";
import {
  ICountResult,
  ICreateUser,
  IResult,
  IUserResult,
} from "../interfaces/user.interface";

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

  async getUserByUserId(userId: string): Promise<ICountResult | any> {
    const connection = await pool.getConnection();
    try {
      const sql = `
        select
          count(*) as count
        from user
          where user_id = ?`;
      const [result] = await connection.execute<RowDataPacket[]>(sql, [userId]);
      return {
        count: result[0].count,
      };
    } catch (error) {
      return {
        result: 0,
      };
    } finally {
      connection.release();
    }
  }

  async createUser(userInfo: ICreateUser): Promise<IResult> {
    const connection = await pool.getConnection();
    try {
      const createUserSql = `
        insert into user (
          user_id,
          nickname,
          email,
          password
        ) values (
          ?,
          ?,
          ?,
          ?
          )`;

      const [result] = await connection.execute<RowDataPacket[]>(
        createUserSql,
        [userInfo.userId, userInfo.nickname, userInfo.email, userInfo.password]
      );
      return {
        result: 1,
      };
    } catch (error) {
      return {
        result: 0,
      };
    } finally {
      connection.release();
    }
  }
}
