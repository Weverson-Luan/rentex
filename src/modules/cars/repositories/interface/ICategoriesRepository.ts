//cria contrato da classe de Category
//quando pensamos em contrato logo vem ao nome interface  por que na interface agente tem a definição do que uma classe precisar ter ao implementa nosssa interface
//por que isso ?
//

import { Category } from "../../infra/typeorm/entity/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
