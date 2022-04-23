import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListingRentalsByUserCase } from "./ListingRentalsByUserUseCase";


class ListingRentalsByUserController {

  async handle(request: Request, response:Response):Promise<Response>{
    const { id: user_id } = request.user;

    const listingRentalsByUseCase = container.resolve(ListingRentalsByUserCase);

    const rentalsByUser = await listingRentalsByUseCase.execute(user_id);

    return response.status(200).json(rentalsByUser);
    
  };
};

export { ListingRentalsByUserController };