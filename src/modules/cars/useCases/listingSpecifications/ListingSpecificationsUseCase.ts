import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/interface/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
@injectable()
class ListingSpecificationsUseCase {
    constructor(
      @inject("SpecificationsRepository")
      private specificationRepository: ISpecificationsRepository,
    ){}

    async execute(){
      const specificationsAlreadyExists = await this.specificationRepository.findBySpecifications();

      if(!specificationsAlreadyExists){
        throw new AppError("Specification does not exists !", 404);
      };

      return specificationsAlreadyExists;
    };
};

export { 
  ListingSpecificationsUseCase,
};