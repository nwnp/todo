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
exports.auth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const USER = {
    id: "fakeid",
    password: "fakepassword",
    email: "fakeemail",
};
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    jsonwebtoken_1.default.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(404).json({
                result: "1",
                message: "Authentication Error",
            });
        }
        const user = jsonwebtoken_1.default.verify(tokenValue, process.env.JWT_SECRET);
        if (user.id !== USER.id) {
            return res.status(404).json({
                result: "1",
                message: "Authentication Error",
            });
        }
        next();
    }));
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map