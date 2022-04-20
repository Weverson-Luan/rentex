import { getRepository, Repository } from 'typeorm';
import { Specification } from "@modules/cars/infra/typeorm/entity/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "@modules/cars/repositories/interface/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Repository<Specification>;

  constructor() {
    this.specifications = getRepository(Specification);
  }
  
 async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {

  const specification = this.specifications.create({
    description,
    name,
  });

  await this.specifications.save(specification);

  return specification;

  }
  

  async findByName(name: string): Promise<Specification> {
    const specificationAllExists = await this.specifications.findOne({name});

      return specificationAllExists;
  }

  async findById(ids: string[]): Promise<Specification[]> {
    const specifications = await this.specifications.findByIds(ids);
    return specifications;
  }
}

export { SpecificationsRepository };
