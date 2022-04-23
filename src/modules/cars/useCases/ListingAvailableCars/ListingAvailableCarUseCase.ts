import { inject, injectable } from "tsyringe";
import { Car } from "@modules/cars/infra/typeorm/entity/Car";
import { ICarRepository } from "@modules/cars/repositories/interface/ICarRepository";



export interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListingAvailableCarUseCase {
  constructor(
    @inject('CarRepository')
    private carsRepository: ICarRepository
  ){}

  async execute({name, brand, category_id}: IRequest): Promise<Car[]>{
    const cars = await this.carsRepository.findAvailable(name, brand, category_id);
    
    return cars;

  }
};

export { ListingAvailableCarUseCase };