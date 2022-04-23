import { Request, Response } from "express";
import { container } from 'tsyringe';

import { ListingCategoryUseCase } from "@modules/cars/useCases/listingCategory/ListingCategoryUseCase";

class ListingCategoryController {
  
  async handle(request: Request, response: Response) {
    const searchCategoryUseCase = container.resolve(ListingCategoryUseCase);

    const searchCategory = await searchCategoryUseCase.handle();

    return response.status(200).json(searchCategory);
  }
}

export { ListingCategoryController };
