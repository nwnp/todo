"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const connection_1 = __importDefault(require("../db/connection"));
class UserRepository {
    constructor() { }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default.getConnection();
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
                const [user] = yield connection.execute(sql, [userId]);
                return {
                    result: 1,
                    user,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    result: 0,
                };
            }
            finally {
                connection.release();
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default.getConnection();
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
                const [user] = yield connection.execute(sql, [email]);
                return user[0];
            }
            catch (error) {
                console.log(error);
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map