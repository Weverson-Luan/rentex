import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryController } from "./CreateCategoryController";
import CategoriesRepository from "../../cars/repositories/implementations/CategoriesRepository";

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );
  return createCategoryController;
};

