"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const user_router_1 = __importDefault(require("./routes/user.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.SERVER_PORT;
const HOST = process.env.NODE_ENV == "production"
    ? "aws ip or domain name"
    : "http://localhost";
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
process.env.NODE_ENV == "production"
    ? app.use((0, morgan_1.default)("combined"))
    : app.use((0, morgan_1.default)("dev"));
app.use("/", index_1.default);
app.use("/user", user_router_1.default);
app.listen(PORT, () => {
    console.log(`The server is running at ${HOST}:${PORT}`);
});
//# sourceMappingURL=app.js.map