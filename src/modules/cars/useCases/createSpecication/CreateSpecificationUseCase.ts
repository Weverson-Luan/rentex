import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface SpecificationProps {
  id?: string;
  name: string;
  description: string;
};

@injectable() //fazendo que nossoa clasee seja injetada por depedência
class CreateSpecificationUseCase {

  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: SpecificationsRepository,
  ){}

    async execute({name, description }: SpecificationProps): Promise<SpecificationProps>{

      const specification = this.specificationRepository.create({
        name,
        description,
      });

      return specification;
    }
};

export {
  CreateSpecificationUseCase,
};