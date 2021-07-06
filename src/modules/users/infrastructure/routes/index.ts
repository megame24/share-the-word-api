import express from "express";
import { RegisterUserViaEmailController } from "../../interfaceAdapters/controllers";
import useCases from "../../useCases";

const { registerUserViaEmail } = useCases;

const userRouter = express.Router();

userRouter.post("/register", (req, res, next) =>
  new RegisterUserViaEmailController(registerUserViaEmail).execute(
    req,
    res,
    next
  )
);

export { userRouter };
