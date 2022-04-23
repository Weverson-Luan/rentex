import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListingSpecificationsUseCase } from "./ListingSpecificationsUseCase";


class ListingSpecificationsController {

  async handle(request: Request, response: Response):Promise<Response>{

    const listingSpecificationsUseCase = container.resolve(ListingSpecificationsUseCase);

    const specifications = await listingSpecificationsUseCase.execute();

    return response.status(200).json(specifications);
  }
};

export { ListingSpecificationsController };