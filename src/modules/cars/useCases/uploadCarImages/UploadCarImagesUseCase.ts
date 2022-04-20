import { ICarRepository } from "@modules/cars/repositories/interface/ICarRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/interface/IcarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {

  constructor(
    @inject("CarImagesRepositories")
    private carImagesRepository: ICarsImagesRepository,
  ){}

  async execute({car_id, images_name}: IRequest): Promise<void>{
    //vou pecorrer o array de images_name e fazer a criação

    images_name.map( async (image)=> {
      await this.carImagesRepository.create(car_id, image);
    });
  }
};

export { UploadCarImagesUseCase };