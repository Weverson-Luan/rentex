import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListingAvailableCarUseCase } from "@modules/cars/useCases/listingCars/ListingAvailableCarsUseCase.";

class ListingAvailableCarController {

    async handle(request: Request, response: Response):Promise<Response>{
      const { name, brand, category_id } = request.query;  //localhost/list/params?
     

      const listingAvailableCarUseCase = container.resolve(ListingAvailableCarUseCase);

      const cars = await listingAvailableCarUseCase.execute({
        name: name as string,
        brand: brand as string,
        category_id: category_id as string,
      });
     

      return response.status(200).json(cars)

    }
};

export { ListingAvailableCarController };