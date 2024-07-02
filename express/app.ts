import createError from "http-errors";
import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import indexRouter from "./routes/index";
import commentsRouter from "./routes/comments.router";
import usersRouter from "./routes/users.router";

interface ResponseError extends Error {
  status?: number;
}

const app: Application = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware setup
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes setup
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

// Catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: any) => {
  next(createError(404));
});

// Error handler
app.use(
  (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render("error");
  },
);

export default app;
