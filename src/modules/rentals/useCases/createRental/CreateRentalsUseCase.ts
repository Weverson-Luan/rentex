import { inject, injectable } from "tsyringe";
import { Rental } from "@modules/rentals/infra/typeorm/entity/Rentals";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IRentalsRepository } from "@modules/rentals/repositories/interface/IRentalsRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysDateProvider";
import { ICarRepository } from "@modules/cars/repositories/interface/ICarRepository";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
    id?: string;
    end_date?: Date
};


@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarRepository")
        private carsRepository: ICarRepository,

    ){}

    async execute({ user_id, car_id, expected_return_date, end_date, id }: IRequest): Promise<Rental>{
        const minimumHour = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
       
        if(carUnavailable){
            throw new AppError("Car is unavailable");
        };

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    
        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for user!");
        };

        const dateNow = this.dateProvider.dateNow();
    
        const compare = this.dateProvider.compareInHours(
          dateNow,
          expected_return_date
        );

        if (compare < minimumHour) {
          throw new AppError("Invalid return time!");
        };

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        await this.carsRepository.updatedAvailable(car_id, false);

        return rental;

    };
};

export { CreateRentalUseCase };