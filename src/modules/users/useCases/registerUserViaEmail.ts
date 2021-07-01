import User from "../entities/user";
import AppError from "../../shared/core/AppError";
import { SecurityService } from "../infrastructure/services/securityService";
import { UUIDService } from "../infrastructure/services/uuidService";
import { UserRepo } from "../infrastructure/repositories/userRepositories/userRepository";

interface registerUserDTO {
  username: string;
  email: string;
  password: string;
  name: string;
}

// explore naming this signup use case
// send verification email after creating user

export default class RegisterUserViaEmail {
  constructor(
    private securityService: SecurityService,
    private uuidService: UUIDService,
    private userRepo: UserRepo
  ) {}

  async execute(registerUserDTO: registerUserDTO) {
    const emailExists = await this.userRepo.emailExists(registerUserDTO.email);
    if (emailExists) {
      throw AppError.badRequestError("User with that email already exists");
    }
    const usernameExists = await this.userRepo.usernameExists(
      registerUserDTO.username
    );
    if (usernameExists) {
      throw AppError.badRequestError("User with that username already exists");
    }

    const user = await User.create(
      registerUserDTO,
      this.securityService,
      this.uuidService
    );
    await this.userRepo.create(user);
  }
}
