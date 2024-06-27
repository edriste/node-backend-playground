import createError from "http-errors";
import express, { Application, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import commentsRouter from "./routes/comments.router";
import usersRouter from "./routes/users.router";
import { connectToDatabase } from "./services/database.service";

interface ResponseError extends Error {
  status?: number;
}

const app: Application = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connectToDatabase()
  .then(() => {
    app.use("/", indexRouter);
    app.use("/users", usersRouter);
    app.use("/comments", commentsRouter);

    // catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: any) => {
      next(createError(404));
    });

    // error handler
    app.use((err: ResponseError, req: Request, res: Response, next: any) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

export default app;