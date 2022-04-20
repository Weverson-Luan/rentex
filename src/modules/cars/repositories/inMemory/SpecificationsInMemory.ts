import { Specification } from "@modules/cars/infra/typeorm/entity/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../interface/ISpecificationsRepository";


class SpecificationsInMemory implements ISpecificationsRepository{
  specification : Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification,{
      name,
      description
    });

    this.specification.push(specification);
    
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
      const specification = this.specification.find((specification) => specification.name === name );

      return specification;
    
  }

  async findById(ids: string[]): Promise<Specification[]> {
    //vamos fazer um filter e buscar onde tem somentes os id`s dentro do array de specification  
    const specificationAll = this.specification.filter(specification => ids.includes(specification.id))

    return specificationAll;
  }
};

export { SpecificationsInMemory, ICreateSpecificationDTO };