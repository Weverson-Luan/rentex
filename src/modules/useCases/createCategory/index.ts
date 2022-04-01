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

// import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';
// import CreateCategoryUseCase from './CreateCategoryuUseCase';
// import CreateCategoryController from './CreateCategoryController';

// export default () => {
// 	const categoriesRepository = new CategoriesRepository();

// 	const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

// 	const createCategoryController = new CreateCategoryController(
// 		createCategoryUseCase
// 	);

// 	return createCategoryController;
// };
