import { UserProps } from "../../../entities/user";

export interface UserRepo {
  emailExists: (email: string) => boolean;
  usernameExists: (username: string) => boolean;
  create: (user: UserProps) => void;
}

export class UserRepoImplementation implements UserRepo {
  constructor(private models: any) {}

  emailExists(email: string) {
    return true;
  }

  usernameExists(username: string) {
    return true;
  }

  create(user: UserProps) {
    console.log(user);
  }
}
