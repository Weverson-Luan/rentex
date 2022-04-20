import { Car } from "@modules/cars/infra/typeorm/entity/Car";
import { Specification } from "@modules/cars/infra/typeorm/entity/Specification";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { SpecificationsInMemory } from "@modules/cars/repositories/inMemory/SpecificationsInMemory";
import { ICarRepository } from "@modules/cars/repositories/interface/ICarRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/interface/ISpecificationsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";



interface IRequest {
  car_id?: string;
  specifications_id?: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private readonly carRepository: ICarRepository,
    @inject("ISpecificationsRepository")
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

  }
}
export { CreateCarSpecificationUseCase };