import express from "express";
import { RegisterUserViaEmailController } from "../../interfaceAdapters/controllers";

const userRouter = express.Router();

userRouter.post("/register", (req, res, next) =>
  RegisterUserViaEmailController.execute(req, res, next)
);

export { userRouter };
