import { Request, Response } from "express";
import { container } from 'tsyringe';
import { SearchCategoryUseCase } from "./SearchCategoryUseCase";

class SearchCategoryController {
  
  async handle(request: Request, response: Response) {
    const searchCategoryUseCase = container.resolve(SearchCategoryUseCase);

    const searchCategory = await searchCategoryUseCase.handle();

    return response.status(200).json(searchCategory);
  }
}

export { SearchCategoryController };
