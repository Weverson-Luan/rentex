import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListingAvailableCarUseCase } from "@modules/cars/useCases/ListingCar/ListingAvailableCarUseCase.";

class ListingAvailableCarController {

    async handle(request: Request, response: Response):Promise<Response>{
      const { name, brand, category_id } = request.query;  //localhost/list/params?
      console.log("cars", name)

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