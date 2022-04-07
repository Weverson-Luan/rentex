import { inject, injectable } from 'tsyringe';
import { Category } from "../../cars/entity/Category";
import { ICategoriesRepository } from "../../cars/repositories/interface/ICategoriesRepository";

@injectable() //fazendo que nossoa clasee seja injetada por depedência
class SearchCategoryUseCase {
  constructor(
    @inject('CategoriesRepository') //fazendo injeção de depedência
    private categoriesRepository: ICategoriesRepository
  ) {}
async  handle(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
   
    return categories;
  }
}

export { SearchCategoryUseCase };
