import { Category } from "../../cars/entity/Category";
import { ICategoriesRepository } from "../../cars/repositories/interface/ICategoriesRepository";

class SearchCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  handle(): Promise<Category[]> {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export { SearchCategoryUseCase };
