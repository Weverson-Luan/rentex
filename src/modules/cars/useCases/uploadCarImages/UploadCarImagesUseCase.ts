import { ICarsImagesRepository } from '@modules/cars/repositories/interface/IcarsImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {

  constructor(
    @inject('CarImagesRepositories')
    private carImagesRepository: ICarsImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ){}

  async execute({car_id, images_name}: IRequest): Promise<void>{
    //vou pecorrer o array de images_name e fazer a criação

    images_name.map( async (image)=> {
      await this.carImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars')
    });
  }
};

export { UploadCarImagesUseCase };