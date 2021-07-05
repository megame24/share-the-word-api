import { UserRepo } from "../../../users/infrastructure/repositories/userRepository";
import { SecurityService } from "../../../users/infrastructure/services/securityService";
import { UUIDService } from "../../../users/infrastructure/services/uuidService";

export class UserRepoImplementation implements UserRepo {
  emailExists = jest.fn().mockResolvedValueOnce(true).mockResolvedValue(false);
  usernameExists = jest
    .fn()
    .mockResolvedValueOnce(true)
    .mockResolvedValue(false);
  create = jest.fn();
}

export class SecurityServiceImplementation implements SecurityService {
  hash = jest.fn().mockResolvedValue("hashed-password");
  compare = jest.fn().mockResolvedValue(true);
}

export class UUIDServiceImplementation implements UUIDService {
  generate = jest.fn().mockReturnValue("this_is_a_random_uuid");
}
