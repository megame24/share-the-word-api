import User, { UserProps } from "./user";
import sharedServices from "../../shared/infrastructure/services";
import { SecurityService } from "../infrastructure/services/securityService";
import { UUIDService } from "../infrastructure/services/uuidService";

const { errorServiceImplementation } = sharedServices;

class SecurityServiceImplementation implements SecurityService {
  hash(plaintext: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`hashed-${plaintext}`);
    });
  }

  compare(plaintext: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}

class UUIDServiceImplementation implements Partial<UUIDService> {
  generate(): string {
    return "this_is_a_random_uuid";
  }
}

const validUserProps = {
  name: "Mr. crabs",
  email: "test@test.com",
  username: "test124",
  password: "P@ssw0rd",
};

const createUser = (userProps: UserProps) => {
  return User.create(
    userProps,
    errorServiceImplementation,
    new SecurityServiceImplementation(),
    new UUIDServiceImplementation()
  );
};

describe("Testing creating a user entity", () => {
  it("Should throw an error if name is not provided", async () => {
    const invalidUserProps = { ...validUserProps, name: "" };
    let user;
    let error;

    try {
      user = await createUser(invalidUserProps);
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual("Name is required");
    expect(user).toBeUndefined();
  });
  it("Should throw an error if name doesn't have a length greater than 1 and less than 255", async () => {
    const invalidUserProps1 = { ...validUserProps, name: "a" };
    let user1;
    let error1;

    try {
      user1 = await createUser(invalidUserProps1);
    } catch (err) {
      error1 = err;
    }

    expect(error1.message).toEqual(
      "Name length must be greater than 1 and less than 255"
    );
    expect(user1).toBeUndefined();

    const invalidUserProps2 = {
      ...validUserProps,
      name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    };
    let user2;
    let error2;

    try {
      user2 = await createUser(invalidUserProps2);
    } catch (err) {
      error2 = err;
    }

    expect(error2.message).toEqual(
      "Name length must be greater than 1 and less than 255"
    );
    expect(user2).toBeUndefined();
  });
  it("Should throw an error if email is not provided", async () => {
    const invalidUserProps = { ...validUserProps, email: "" };
    let user;
    let error;

    try {
      user = await createUser(invalidUserProps);
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual("Email is required");
    expect(user).toBeUndefined();
  });
  it("Should throw an error if email is invalid", async () => {
    const invalidUserProps = { ...validUserProps, email: "invalid@email" };
    let user;
    let error;

    try {
      user = await createUser(invalidUserProps);
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual("Invalid email");
    expect(user).toBeUndefined();
  });
  it("Should throw an error if username is not provided", async () => {
    const invalidUserProps = { ...validUserProps, username: "" };
    let user;
    let error;

    try {
      user = await createUser(invalidUserProps);
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual("Username is required");
    expect(user).toBeUndefined();
  });
  it("Should throw an error if username doesn't have a length greater than 1 and less than 255", async () => {
    const invalidUserProps1 = { ...validUserProps, username: "a" };
    let user1;
    let error1;

    try {
      user1 = await createUser(invalidUserProps1);
    } catch (err) {
      error1 = err;
    }

    expect(error1.message).toEqual(
      "Username length must be greater than 1 and less than 255"
    );
    expect(user1).toBeUndefined();

    const invalidUserProps2 = {
      ...validUserProps,
      username:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    };
    let user2;
    let error2;

    try {
      user2 = await createUser(invalidUserProps2);
    } catch (err) {
      error2 = err;
    }

    expect(error2.message).toEqual(
      "Username length must be greater than 1 and less than 255"
    );
    expect(user2).toBeUndefined();
  });
  it("Should throw an error if password is not provided", async () => {
    const invalidUserProps = { ...validUserProps, password: "" };
    let user;
    let error;

    try {
      user = await createUser(invalidUserProps);
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual("Password is required");
    expect(user).toBeUndefined();
  });
  it("Should throw an error if password is not provided", async () => {
    const invalidUserProps = { ...validUserProps, password: "password1" };
    let user;
    let error;

    try {
      user = await createUser(invalidUserProps);
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual(
      "Your password must be greater than 8 characters and must " +
        "contain at least one uppercase letter, one lowercase letter, one number, and a special character"
    );
    expect(user).toBeUndefined();
  });
  it("Should create the user successfully when all checks pass", async () => {
    let user: any;
    let error;

    try {
      user = await createUser(validUserProps);
    } catch (err) {
      error = err;
    }

    expect(user.id).toEqual("this_is_a_random_uuid");
    expect(user.name).toEqual(validUserProps.name);
    expect(user.email).toEqual(validUserProps.email);
    expect(user.password).toEqual(validUserProps.password);
    expect(error).toBeUndefined();
  });
});