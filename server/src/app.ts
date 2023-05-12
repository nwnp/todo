import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import userRouter from "./routes/user.router";

dotenv.config();

const app = express();

const PORT = process.env.SERVER_PORT;
const HOST =
  process.env.NODE_ENV == "production"
    ? "aws ip or domain name"
    : "http://localhost";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

process.env.NODE_ENV == "production"
  ? app.use(morgan("combined"))
  : app.use(morgan("dev"));

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`The server is running at ${HOST}:${PORT}`);
});
