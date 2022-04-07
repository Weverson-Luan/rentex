import {inject,injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { ISpecificationsRepository } from "../../cars/repositories/interface/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable() //fazendo que nossoa clasee seja injetada por depedência
export class CreateSpecificationUseCase {
  constructor(
    @inject("ISpecificationsRepository") //fazendo injeção de depedência
    private specificationsRepositroy: ISpecificationsRepository
  ) {}
 async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepositroy.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification alread exists!", 404);
    }
    
    this.specificationsRepositroy.create({
      name,
      description,
    });
  }
}
