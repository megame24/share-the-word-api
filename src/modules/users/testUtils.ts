import { EmailService } from "../shared/infrastructure/services/emailService";
import { UserRepo } from "./infrastructure/repositories/userRepository";
import { SecurityService } from "./infrastructure/services/securityService";
import { UUIDService } from "./infrastructure/services/uuidService";
import { RegisterUserViaEmail } from "./useCases/registerUserViaEmail";

export class MockUserRepo implements UserRepo {
  emailExists = jest.fn();
  usernameExists = jest.fn();
  create = jest.fn();
}

export class MockSecurityService implements SecurityService {
  hash = jest.fn().mockResolvedValue("hashed-password");
  compare = jest.fn();
}

export class MockUUIDService implements UUIDService {
  generate = jest.fn().mockReturnValue("this_is_a_random_uuid");
}

export class MockRegisterUserViaEmail implements RegisterUserViaEmail {
  execute = jest.fn();
}

export const mockUUUIDv4 = jest.fn();

export const mockBcrypt = {
  hash: jest.fn(),
  compare: jest.fn(),
};

export const mockUserModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};

export class MockEmailService implements EmailService {
  sendWelcomeEmail = jest.fn();
}
