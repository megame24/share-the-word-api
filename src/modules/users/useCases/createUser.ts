import User from "../entities/user";
import AppError from "../../shared/core/AppError";
import { SecurityService } from "../infrastructure/services/securityService";
import { UUIDService } from "../infrastructure/services/uuidService";
import { UserRepo } from "../infrastructure/repositories/userRepo/userRepository";

interface createUserDTO {
  username: string;
  email: string;
  password: string;
  name: string;
}

export default class CreateUser {
  constructor(
    private securityService: SecurityService,
    private uuidService: UUIDService,
    private userRepo: UserRepo
  ) {}

  async execute(createUserDTO: createUserDTO) {
    const emailExists = await this.userRepo.emailExists(createUserDTO.email);
    if (emailExists) {
      throw AppError.badRequestError("User with that email already exists");
    }
    const usernameExists = await this.userRepo.usernameExists(
      createUserDTO.username
    );
    if (usernameExists) {
      throw AppError.badRequestError("User with that username already exists");
    }

    const user = await User.create(
      createUserDTO,
      this.securityService,
      this.uuidService
    );
    await this.userRepo.create(user);
  }
}
