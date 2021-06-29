import User from "../entities/user";
import AppError from "../../shared/core/AppError";
import { SecurityService } from "../infrastructure/services/securityService";
import { UUIDService } from "../infrastructure/services/uuidService";
import { UserRepo } from "../infrastructure/repositories/userRepo/userRepository";

interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
  name: string;
}

export default class registerUser {
  constructor(
    private securityService: SecurityService,
    private uuidService: UUIDService,
    private userRepo: UserRepo
  ) {}

  async execute(registerUserDTO: RegisterUserDTO) {
    const emailExists = await this.userRepo.emailExists(registerUserDTO.email);
    if (emailExists) {
      throw AppError.badRequestError("User with that email already exists");
    }
    const usernameExists = this.userRepo.usernameExists(
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
