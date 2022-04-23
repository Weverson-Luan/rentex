
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
 
 async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createUserUseCase = container.resolve(AuthenticationUseCase);

    const token = await createUserUseCase.execute({ email, password });

    return res.status(201).json(token);
  }
}

export { AuthenticateUserController }; 
