import User from "../entities/user";
import { SecurityService } from "../infrastructure/services/securityService";
import { UUIDService } from "../infrastructure/services/uuidService";

interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
  name: string;
}

export default class registerUser {
  // have a public execute function
  // the controller will pass a registerUserDTO
  // check for already existing email and username
  // create user
  // and save it
  // return nothing
  constructor(
    private securityService: SecurityService,
    private uuidService: UUIDService
  ) {}

  execute(registerUserDTO: RegisterUserDTO): Promise<User> {
    // the repositories should handle errors that can arise from interacting
    // with external db packages

    return User.create(registerUserDTO, this.securityService, this.uuidService);
  }
}
