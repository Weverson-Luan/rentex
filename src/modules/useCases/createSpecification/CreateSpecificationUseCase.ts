import { ISpecificationsRepository } from "../../cars/repositories/interface/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationsRepositroy: ISpecificationsRepository) {}
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationsRepositroy.findByName(name);
    if (specificationAlreadyExists) {
      throw new Error("Specification alread exists!");
    }
    this.specificationsRepositroy.create({
      name,
      description,
    });
  }
}
