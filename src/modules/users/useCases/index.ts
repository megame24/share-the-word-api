import userServices from "../infrastructure/services";
import userRepositories from "../infrastructure/repositories/userRepositories";
import RegisterUserViaEmail from "./registerUserViaEmail";

const { securityServiceImplementation, uuidServiceImplementation } =
  userServices;
const { userRepoImplementation } = userRepositories;

const registerUserViaEmail = new RegisterUserViaEmail(
  securityServiceImplementation,
  uuidServiceImplementation,
  userRepoImplementation
);

export default {
  registerUserViaEmail,
};
