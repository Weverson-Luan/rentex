import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response>{
    const {id : car_id } = request.params;
    const { specifications_id} = request.body;
    
    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

    const specification =  await createCarSpecificationUseCase.execute({
    car_id,
    specifications_id,
   });

   return response.status(200).json(specification);
  }
};
export { 
  CreateCarSpecificationController,
};