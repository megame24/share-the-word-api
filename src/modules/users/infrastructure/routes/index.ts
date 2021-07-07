import express from "express";
import { RegisterUserViaEmailController } from "../../interfaceAdapters/controllers";
import useCases from "../../useCases";

const { registerUserViaEmailImplementation } = useCases;

const userRouter = express.Router();

userRouter.post("/register", (req, res, next) =>
  new RegisterUserViaEmailController(
    registerUserViaEmailImplementation
  ).execute(req, res, next)
);

export { userRouter };
