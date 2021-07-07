import { RegisterUserViaEmailController } from "./registerUserViaEmailController";
import { MockRegisterUserViaEmail } from "../../testUtils";
import AppError from "../../../shared/core/AppError";

const mockRegisterUserViaEmail = new MockRegisterUserViaEmail();
const registerUserViaEmailController = new RegisterUserViaEmailController(
  mockRegisterUserViaEmail
);

const req = {
  body: {
    username: "user1234",
    email: "email@test.com",
    password: "P@ssw0rd",
    name: "Mr. Taiemo",
  },
};
const next = jest.fn();
const res = {
  status: jest.fn().mockReturnValue({
    json: jest.fn(),
  }),
};

describe("Register user via email controller test", () => {
  it("When there's an error, should call next middleware function call with the error", async () => {
    await registerUserViaEmailController.execute(req, res, next);
    expect(next).toBeCalledWith(AppError.badRequestError());
  });
  it("Should call register user via email use case and return 201 when there's no error", async () => {
    await registerUserViaEmailController.execute(req, res, next);
    expect(mockRegisterUserViaEmail.execute).toBeCalledWith(req.body);
    expect(res.status).toBeCalledWith(201);
    expect(res.status().json).toBeCalledWith("");
  });
});
