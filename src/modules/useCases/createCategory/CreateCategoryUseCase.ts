import { ICategoriesRepository } from "../../cars/repositories/interface/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  async execute({ name, description }: IRequest): Promise<void> {
    // const cateogryAlreadyExists = await this.categoriesRepository.findByName(
    //   name
    // );
    // console.log("categorie", cateogryAlreadyExists);

    // if (cateogryAlreadyExists) throw new Error("Category already exists");

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
