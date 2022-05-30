import "reflect-metadata";
import { AppError } from '@shared/errors/AppError';
import { ICarRepository } from '@modules/cars/repositories/interface/ICarRepository';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { inject, injectable } from 'tsyringe';
import { Car } from '@modules/cars/infra/typeorm/entity/Car';


@injectable() //fazendo que nossoa clasee seja injetada por depedência
class CreateCarUseCase {
  
  constructor(
    @inject("CarRepository")
    private carsRepository: ICarRepository,
  ){}

  async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car>{

    const carAllreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

    if(carAllreadyExists){
      throw new AppError("Car already exists!")
    }
    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    return car;
  }
};
export { CreateCarUseCase };