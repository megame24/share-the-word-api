/* eslint-disable max-len */
import { ErrorService } from "../../shared/infrastructure/services/errorService";
import { SecurityService } from "../infrastructure/services/securityService";
import { UUIDService } from "../infrastructure/services/uuidService";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  username: string;
  password: string;
  isPasswordHashed: boolean;
  role?: Role;
  verified?: boolean;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
}

export default class User {
  private static passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!”#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]).{8,}$/;
  private static emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private constructor(private props: UserProps) {}

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  get role(): Role | undefined {
    return this.props.role;
  }

  private static validateName(name: string): ValidationResult {
    if (!name) {
      return { isValid: false, message: "Name is required" };
    }
    if (name.length < 2 || name.length >= 255) {
      return {
        isValid: false,
        message: "Name length must be greater than 1 and less than 255",
      };
    }
    return { isValid: true, message: "" };
  }

  private static validateEmail(email: string): ValidationResult {
    if (!email) {
      return { isValid: false, message: "Email is required" };
    }
    if (!this.emailRegEx.test(email)) {
      return { isValid: false, message: "Invalid email" };
    }
    return { isValid: true, message: "" };
  }

  private static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private static validateUsername(username: string): ValidationResult {
    if (!username) {
      return { isValid: false, message: "Username is required" };
    }
    if (username.length < 2 || username.length >= 255) {
      return {
        isValid: false,
        message: "Username length must be greater than 1 and less than 255",
      };
    }
    return { isValid: true, message: "" };
  }

  private static validatePassword(password: string): ValidationResult {
    if (!password) {
      return { isValid: false, message: "Password is required" };
    }
    if (this.passwordRegEx.test(password)) {
      return {
        isValid: false,
        message: `Your password must be greater than 8 characters and must contain at least one 
          uppercase letter, one lowercase letter, one number, and a special character`,
      };
    }
    return { isValid: true, message: "" };
  }

  private static validateRole(role: Role): ValidationResult {
    if (!Role[role]) {
      return { isValid: false, message: "Invalid role" };
    }
    return { isValid: true, message: "" };
  }

  private static validateProp<T>(
    prop: T,
    validator: (prop: T) => ValidationResult,
    errorService: ErrorService
  ) {
    const validationResult = validator(prop);
    if (!validationResult.isValid) {
      errorService.throwError(validationResult.message, 400);
    }
  }

  static async create(
    props: UserProps,
    errorService: ErrorService,
    securityService: SecurityService,
    uuidService: UUIDService
  ): Promise<User> {
    this.validateProp(props.name, this.validateName, errorService);
    this.validateProp(props.email, this.validateEmail, errorService);
    this.validateProp(props.username, this.validateUsername, errorService);
    this.validateProp(props.password, this.validatePassword, errorService);
    if (props.role) {
      this.validateProp(props.role, this.validateRole, errorService);
    } else {
      props.role = Role.USER;
    }

    props.email = this.formatEmail(props.email);
    if (!props.isPasswordHashed) {
      props.password = await securityService.hash(props.password);
    }
    if (!props.id) {
      props.id = uuidService.generate();
    }

    return new User(props);
  }
}
