import { getRepository, Repository } from 'typeorm';
import { Specification } from "../../entity/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../interface/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Repository<Specification>;

  constructor() {
    this.specifications = getRepository(Specification);
  }
 async create({ name, description }: ICreateSpecificationDTO): Promise<void> {

  const specification = this.specifications.create({
    description,
    name,
  });

  await this.specifications.save(specification);

  }
  

  async findByName(name: string): Promise<Specification> {
    const specificationAllExists = await this.specifications.findOne({name});

      return specificationAllExists;
  }
}

export { SpecificationsRepository };
