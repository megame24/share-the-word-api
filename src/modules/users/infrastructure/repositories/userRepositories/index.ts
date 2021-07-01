import models from "../../../../shared/infrastructure/database/models";
import { UserRepoImplementation } from "./userRepository";

const { User } = <any>models;

const userRepoImplementation = new UserRepoImplementation(User);

export default {
  userRepoImplementation,
};
