import userServices from "../infrastructure/services";
import repositories from "../infrastructure/repositories";
import { RegisterUserViaEmailImplementation } from "./registerUserViaEmail";

const { securityServiceImplementation, uuidServiceImplementation } =
  userServices;
const { userRepoImplementation } = repositories;

const registerUserViaEmailImplementation =
  new RegisterUserViaEmailImplementation(
    securityServiceImplementation,
    uuidServiceImplementation,
    userRepoImplementation
  );

export default {
  registerUserViaEmailImplementation,
};
