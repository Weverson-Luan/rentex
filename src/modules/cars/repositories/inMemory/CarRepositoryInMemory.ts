import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entity/Car";
import { ICarRepository } from "../interface/ICarRepository";
import { IRequest } from "@modules/cars/useCases/ListingCar/ListingAvailableCarUseCase."

class CarsRepositoryInMemory implements ICarRepository{
  car: Car[] = []; //iniciando um const de categorias com um Array vazio.

    //fazer uma buscar pelo campo name e retorna uma categoria
async findByLicensePlate(license_plate: string): Promise<Car> {
  const car = this.car.find((carr) => carr.license_plate === license_plate );
  return car;
};

async create({ name, description,daily_rate, license_plate, fine_amount, brand, category_id  }: ICreateCarDTO): Promise<Car> {
    const car = new Car(); //instanciando minha entity

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id   
    })

    this.car.push(car);
    
    return car;
};
async findAvailable(
  brand?: string,
  category_id?: string,
  name?: string
): Promise<Car[]> {
  return this.car.filter((car) => {
    if (
      car.available === true ||
      (brand && car.brand === brand) ||
      (category_id && car.category_id === category_id) ||
      (name && car.name === name)
    ) {
      return car;
    }
    return null;
  });
}
};7
export { CarsRepositoryInMemory };