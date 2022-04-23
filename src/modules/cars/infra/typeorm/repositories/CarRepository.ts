import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/interface/ICarRepository";
import { Car } from "@modules/cars/infra/typeorm/entity/Car";
import { getRepository, Repository } from "typeorm";


class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor(){
    this.repository = getRepository(Car);
  }

async  create({name, description,daily_rate, license_plate, fine_amount, brand, category_id, specifications, id  }: ICreateCarDTO): Promise<Car> {

    const car = this.repository.create({
      name,
      description,
      daily_rate, 
      license_plate,
      fine_amount, 
      brand,
      category_id,
      specifications,
      id
    });

    await this.repository.save(car);

    return car;
    
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {

    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

 async findById(car_id: string): Promise<Car> {
   const car = await this.repository.findOne(car_id)
    return car;
  };

  async updatedAvailable(id: string, available: boolean): Promise<void> {
    await this.repository.createQueryBuilder()
    .update() //atualizar 
    .set({available}) // setar o valor 
    .where("id = :id") //onde o a condição for igual
    .setParameters({id})
    .execute();
    
  }
};

export { CarRepository };