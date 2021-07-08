import {
  RegisterUserViaEmail,
  RegisterUserDTO,
} from "../../useCases/registerUserViaEmail";

export default class RegisterUserViaEmailController {
  constructor(private registerUserViaEmail: RegisterUserViaEmail) {}

  async execute(req: any, res: any, next: any) {
    const { body } = req;
    const registerUserDTO: RegisterUserDTO = {
      username: body.username,
      password: body.password,
      email: body.email,
      name: body.name,
    };

    try {
      await this.registerUserViaEmail.execute(registerUserDTO);
      return res.status(201).json("");
    } catch (error) {
      next(error);
    }
  }
}
