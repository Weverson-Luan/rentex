import { Specification } from "../../infra/typeorm/entity/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}
interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}
export { ISpecificationsRepository, ICreateSpecificationDTO };
