import userServices from "../infrastructure/services";
import repositories from "../infrastructure/repositories";
import RegisterUserViaEmail from "./registerUserViaEmail";

const { securityServiceImplementation, uuidServiceImplementation } =
  userServices;
const { userRepoImplementation } = repositories;

const registerUserViaEmail = new RegisterUserViaEmail(
  securityServiceImplementation,
  uuidServiceImplementation,
  userRepoImplementation
);

export default {
  registerUserViaEmail,
};
