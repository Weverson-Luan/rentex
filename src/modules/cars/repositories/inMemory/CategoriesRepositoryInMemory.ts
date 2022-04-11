import { Category } from "@modules/cars/infra/typeorm/entity/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/interface/ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository{
  categories: Category[] = []; //iniciando um const de categorias com um Array vazio.


//fazer uma buscar pelo campo name e retorna uma categoria
 async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name );
    return category;
  };
  
  //fazer buscar e retornar todas categorias
  async list(): Promise<Category[]> {
    const list = this.categories;
    return list;
  };
  
 async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category(); //instanciando minha entity

    Object.assign(category, {
      name, description
    })

    this.categories.push(category);
  };

};

export { CategoriesRepositoryInMemory };