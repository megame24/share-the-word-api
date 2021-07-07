import AppError from "../shared/core/AppError";
import { UserRepo } from "./infrastructure/repositories/userRepository";
import { SecurityService } from "./infrastructure/services/securityService";
import { UUIDService } from "./infrastructure/services/uuidService";
import { RegisterUserViaEmail } from "./useCases/registerUserViaEmail";

export class MockUserRepo implements UserRepo {
  emailExists = jest.fn().mockResolvedValueOnce(true).mockResolvedValue(false);
  usernameExists = jest
    .fn()
    .mockResolvedValueOnce(true)
    .mockResolvedValue(false);
  create = jest.fn();
}

export class MockSecurityService implements SecurityService {
  hash = jest.fn().mockResolvedValue("hashed-password");
  compare = jest.fn().mockResolvedValue(true);
}

export class MockUUIDService implements UUIDService {
  generate = jest.fn().mockReturnValue("this_is_a_random_uuid");
}

export class MockRegisterUserViaEmail implements RegisterUserViaEmail {
  execute = jest
    .fn()
    .mockRejectedValueOnce(AppError.badRequestError())
    .mockResolvedValue(undefined);
}
