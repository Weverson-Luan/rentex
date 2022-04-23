import { Rental } from "@modules/rentals/infra/typeorm/entity/Rentals";
import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "@modules/rentals/repositories/interface/IRentalsRepository";



@injectable()
class ListingRentalsByUserCase{
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
  ){}

  async execute(user_id: string ): Promise<Rental[]>{
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  };

};

export { ListingRentalsByUserCase };