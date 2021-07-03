import { registerUserDTO } from "../../useCases/registerUserViaEmail";
import useCases from "../../useCases";

const { registerUserViaEmail } = useCases;

export class RegisterUserViaEmailController {
  static async execute(req: any, res: any, next: any) {
    const { body } = req;
    const registerUserDTO: registerUserDTO = {
      username: body.username,
      password: body.password,
      email: body.email,
      name: body.name,
    };

    try {
      await registerUserViaEmail.execute(registerUserDTO);
      res.status(201);
      return next();
    } catch (error) {
      next(error);
    }
  }
}
