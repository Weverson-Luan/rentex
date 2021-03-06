import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entity/Rentals";
import { IRentalsRepository } from "../interface/IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository{

  rentals: Rental[] = [];

  async findOpenRentalByCar(card_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.car_id === card_id && !rental.end_date);
  };

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(user => user.car_id === user_id && !user.end_date);
  }

 async create({car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  };

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rent)=> rent.id === id);

    return rental;
  };

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental)=> rental.user_id === user_id);

    return rentals;
  };
};

export { RentalsRepositoryInMemory };