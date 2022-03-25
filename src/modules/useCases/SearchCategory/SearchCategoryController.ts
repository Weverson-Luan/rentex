import { Request, Response } from "express";
import { Category } from "../../cars/entity/Category";
import { SearchCategoryUseCase } from "./SearchCategoryUseCase";

class SearchCategoryController {
  constructor(private searchCategoryUseCase: SearchCategoryUseCase) {}
  async handle(request: Request, response: Response) {
    const searchCategory = this.searchCategoryUseCase.handle();

    return response.json(searchCategory);
  }
}

export { SearchCategoryController };
