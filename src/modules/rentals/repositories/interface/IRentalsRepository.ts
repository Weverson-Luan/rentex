import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entity/Rentals";


interface IRentalsRepository {
  findOpenRentalByCar(card_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO):Promise<Rental>
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
};

export { IRentalsRepository };