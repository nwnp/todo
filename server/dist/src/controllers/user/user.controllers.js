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
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.getUser = (userIdx) => __awaiter(this, void 0, void 0, function* () { });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, password } = req.body;
            const sqlInjectionRegex = /[\s'";\\]/;
            if (userId.trim() === "" || password.trim() === "") {
                return res.status(400).json({
                    result: 0,
                    message: "Id or Password is Empty",
                });
            }
            if (sqlInjectionRegex.test(userId) || sqlInjectionRegex.test(password)) {
                // TODO: IP 등록 후 차단
                return res.status(400).json({
                    result: 0,
                    message: "Id or Password is Invalid",
                });
            }
            if (userId.trim().length < 4 || password.trim().length < 4) {
                return res.status(400).json({
                    result: 0,
                    message: "Id or Password is Too Short",
                });
            }
            const isExist = yield this.userRepository.getUserById(userId);
            if (!isExist.user.length) {
                return res.status(404).json({
                    result: 0,
                    message: "Not Founded User",
                });
            }
            const isMatch = bcrypt_1.default.compareSync(password, isExist.user[0].password);
            if (!isMatch) {
                return res.status(401).json({
                    result: 0,
                    message: "Id or Password is Not Matched",
                });
            }
            if (isExist.user[0].isUse === "N") {
                return res.status(401).json({
                    result: 0,
                    message: "Stopped User",
                });
            }
            if (isExist.user[0].isDel === "Y") {
                return res.status(401).json({
                    result: 0,
                    message: "Deleted or Banned User",
                });
            }
            res.status(200).json({
                result: 1,
                message: "Login Success",
            });
        });
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        this.userRepository = userRepository;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controllers.js.map