import { ICarRepository } from "@modules/cars/repositories/interface/ICarRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entity/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/interface/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase{
  constructor(
    @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarRepository")
        private carsRepository: ICarRepository,
  ){}
  async execute({id, user_id }: IRequest): Promise<Rental>{
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;
    let total = 0;

    if(!rental){
      throw new AppError("Rentals does exists !");
    };

    // pegando data atual 
    const dateNow = this.dateProvider.dateNow();

   
    //fazendo a comparação para saber quantas diarias teve esse aluguel
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );


    // se caso a diaria seja menor que 0 agente coloca uma 1 dia
    if(daily <= 0 ){
      daily = minimum_daily;
    };

    //calculado quantidade de atrasos se foi um ou dois e assim por diane
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    //caso houve atraso na entrega do carro vamos soma o
   if(delay > 0){
     const calculate_fine = delay * car.fine_amount;

     total = calculate_fine;
   };

   //calcular diarias
   total += daily * car.fine_amount;

   rental.end_date = this.dateProvider.dateNow();
   rental.total = total;

   await this.rentalsRepository.create(rental);
   await this.carsRepository.updatedAvailable(car.id, true);

   return rental;
  };
};


export { DevolutionRentalUseCase };