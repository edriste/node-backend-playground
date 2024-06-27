import express, { Request, Response, NextFunction } from "express";
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get(
  "/",
  function (_req: Request, res: Response, _next: NextFunction) {
    res.render("index", { title: "Express" });
  }
);

export default indexRouter;
