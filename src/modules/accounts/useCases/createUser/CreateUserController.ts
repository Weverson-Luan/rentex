
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

class CreateUserController {
 
 async handle(req: Request, res: Response): Promise<Response> {
    const { name, isAdmin, email, password, driver_license } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ name, isAdmin, email, password, driver_license });

    return res.status(201).send();
  }
}

export { CreateUserController };
