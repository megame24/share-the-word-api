import {
  SecurityServiceImplementation,
  UserRepoImplementation,
  UUIDServiceImplementation,
} from "../../shared/core/test/usersTestUtils";
import RegisterUserViaEmail from "./registerUserViaEmail";

const userRepoImplementation = new UserRepoImplementation();

const registerUserViaEmail = new RegisterUserViaEmail(
  new SecurityServiceImplementation(),
  new UUIDServiceImplementation(),
  userRepoImplementation
);

const registerUserDTO = {
  username: "user1234",
  email: "email@test.com",
  password: "P@ssw0rd",
  name: "Mr. Taiemo",
};

describe("Registering a user via email", () => {
  it("Should throw a 400 error when email already exists", async () => {
    let error;

    try {
      await registerUserViaEmail.execute(registerUserDTO);
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual("User with that email already exists");
    expect(error.statusCode).toEqual(400);
  });

  it("Should throw a 400 error when username already exists", async () => {
    let error;

    try {
      await registerUserViaEmail.execute(registerUserDTO);
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual("User with that username already exists");
    expect(error.statusCode).toEqual(400);
  });

  it("Should call create on userRepo when all checks pass", async () => {
    let error;

    try {
      await registerUserViaEmail.execute(registerUserDTO);
    } catch (err) {
      error = err;
    }

    expect(userRepoImplementation.create).toBeCalledWith({
      id: "this_is_a_random_uuid",
      name: "Mr. Taiemo",
      email: "email@test.com",
      username: "user1234",
      password: "hashed-password",
      role: "USER",
      verified: false,
    });
    expect(error).toBeUndefined();
  });
});
