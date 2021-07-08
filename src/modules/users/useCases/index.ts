import {
  securityServiceImpl,
  uuidServiceImpl,
} from "../infrastructure/services";
import { userRepoImpl } from "../infrastructure/repositories";
import { RegisterUserViaEmailImpl } from "./registerUserViaEmail";

export const registerUserViaEmailImpl = new RegisterUserViaEmailImpl(
  securityServiceImpl,
  uuidServiceImpl,
  userRepoImpl
);
