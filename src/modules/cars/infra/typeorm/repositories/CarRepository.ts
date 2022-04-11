import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/interface/ICarRepository";
import { Car } from "@modules/cars/infra/typeorm/entity/Car";
import { getRepository, Repository } from "typeorm";


class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor(){
    this.repository = getRepository(Car);
  }

async  create({name, description,daily_rate, license_plate, fine_amount, brand, category_id  }: ICreateCarDTO): Promise<Car> {

    const car = this.repository.create({
      name,
      description,
      daily_rate, 
      license_plate,
      fine_amount, 
      brand,
      category_id
    });

    await this.repository.save(car);

    return car;
    
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {

    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAvailable(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
    const carsQuery = await this.repository
          .createQueryBuilder("cars")
          .where("available = :available", { available: true });

      //quando o campo brand vier preenchido iremos fazer outra busca
      if(brand){
        carsQuery.andWhere("cars.brand = :brand", { brand });
      };
      //quando o campo name vier preenchido iremos fazer outra busca
      if(name){
        carsQuery.andWhere("cars.name = :name", { name });
      };
      //quando o campo category_id vier preenchido iremos fazer outra busca
      if(category_id){
        carsQuery.andWhere("cars.category_id = :category_id", { category_id });
      };

      //para realmente de conseguirmos rodar nosso builder
      const cars =  await carsQuery.getMany();

      return cars;
  }

};

export { CarRepository };