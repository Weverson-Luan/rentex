import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entity/Car";



interface ICarRepository {
  create({ name, description }: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
  updatedAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarRepository };

