import {inject,injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { ISpecificationsRepository } from "@modules/cars/repositories/interface/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable() //fazendo que nossoa clasee seja injetada por depedência
export class CreateSpecificationUseCase {
  constructor(
    @inject("ISpecificationsRepository") //fazendo injeção de depedência
    private specificationsRepository: ISpecificationsRepository
  ) {}
 async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);
      console.log(specificationAlreadyExists)

    if (specificationAlreadyExists) {
      throw new AppError("Specification alread exists!", 404);
    }
    
    this.specificationsRepository.create({
      name,
      description,
    });
  }
}
