import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entity/Car";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarRepository } from "@modules/cars/repositories/interface/ICarRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id?: string;
  specifications_id?: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private readonly carRepository: ICarRepository,
    @inject("SpecificationsRepository")
    private readonly specificationRepository: SpecificationsRepository,
  ){}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car>{
    
    const carReadyExists = await this.carRepository.findById(car_id);

    //verificando se o carro não existe
    if(!carReadyExists){
      throw new AppError("Car does not exists 😪", 404)
    };

    const specification = await this.specificationRepository.findById(specifications_id)

    carReadyExists.specifications = specification;

    await this.carRepository.create(carReadyExists);

    return carReadyExists;

  };
}
export { CreateCarSpecificationUseCase };