import { ICarsImagesRepository } from "@modules/cars/repositories/interface/IcarsImagesRepository";
import { getRepository, Repository } from "typeorm";

import { CarImage } from "../entity/CarImage";


class CarsImageRepository implements ICarsImagesRepository {

  carsImagesRepository: Repository<CarImage>

constructor(){
  this.carsImagesRepository = getRepository(CarImage)
}

 async create( car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.carsImagesRepository.create({
      car_id,
      image_name
    });

    await this.carsImagesRepository.save(carImage);

    return carImage;
  };
}

export { CarsImageRepository};