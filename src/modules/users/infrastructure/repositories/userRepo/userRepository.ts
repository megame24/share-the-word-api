export interface UserRepo {
  emailExist: (email: string) => boolean;
  usernameExist: (username: string) => boolean;
}

export class UserRepoImplementation implements UserRepo {
  emailExist(email: string) {
    return true;
  }

  usernameExist(username: string) {
    return true;
  }
}
