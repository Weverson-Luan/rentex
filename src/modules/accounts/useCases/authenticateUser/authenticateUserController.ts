
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationUserUseCase } from "@modules/accounts/useCases/authenticateUser/authenticateUserUseCaseTeste";

import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

class AuthenticateUserController {
 
 async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createUserUseCase = container.resolve(AuthenticationUserUseCase);

    const token = await createUserUseCase.execute({ email, password });

    return res.status(201).json(token);
  }
}

export { AuthenticateUserController }; 
