import { Request, Response } from "express";
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from "@modules/cars/useCases/createSpecification/CreateSpecificationUseCase";

class CreateSpecificationController {
async  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

    createSpecificationUseCase.execute({ name, description });
    
    response.status(201).send();
  }
}

export { CreateSpecificationController };