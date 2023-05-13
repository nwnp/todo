"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = promise_1.default.createPool({
    host: process.env.NODE_ENV == "production" ? "RDS endpoint" : process.env.DB_HOST,
    user: process.env.NODE_ENV == "production" ? "RDS endpoint" : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: typeof process.env.DB_PORT == "string"
        ? parseInt(process.env.DB_PORT)
        : process.env.DB_PORT,
    database: process.env.DB_SCHEMA,
});
//# sourceMappingURL=connection.js.map