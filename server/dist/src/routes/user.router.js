"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user/user.controllers");
const user_repository_1 = require("../repositories/user.repository");
const router = express_1.default.Router();
const userController = new user_controllers_1.UserController(new user_repository_1.UserRepository());
router.post("/login", userController.login);
exports.default = router;
//# sourceMappingURL=user.router.js.map