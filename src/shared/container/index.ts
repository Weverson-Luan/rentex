import { container } from 'tsyringe';

import "@shared/container/providers/DateProvider";
import "@shared/container/providers/MailProvider";
import "@shared/container/providers/StorageProvider";

import { ICategoriesRepository } from '../../modules/cars/repositories/interface/ICategoriesRepository';
import  { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';

import { ISpecificationsRepository } from '../../modules/cars/repositories/interface/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';

import { IUsersRepository } from '../../modules/accounts/repositories/interface/IUsersRepository';
import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';

import { ICarRepository } from '../../modules/cars/repositories/interface/ICarRepository';
import { CarRepository } from '../../modules/cars/infra/typeorm/repositories/CarRepository';

import { IRentalsRepository } from '@modules/rentals/repositories/interface/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';

import { IUsersTokensRepository } from '../../modules/accounts/repositories/interface/IUsersTokensRepository';
import { UsersTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/interface/IcarsImagesRepository';
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';



//ICategoryRepositorie => vamos passar nossa interface de repositorio, eai vamos dar um nome para nosso registro
// para quando agente for usar esse nome ele já intendera qual classe estamos chamando
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);


//ISpecificationRepositorie => vamos passar nossa interface de repositorio, eai vamos dar um nome para nosso registro
// para quando agente for usar esse nome ele já intendera qual classe estamos chamando
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);


//IUsersRepository => vamos passar nossa interface de repositorio, eai vamos dar um nome para nosso registro
// para quando agente for usar esse nome ele já intendera qual classe estamos chamando
container.registerSingleton<IUsersRepository>(
  "UserRepository",
  UserRepository
);

//ICarRepository => vamos passar nossa interface de repositorio, eai vamos dar um nome para nosso registro
// para quando agente for usar esse nome ele já intendera qual classe estamos chamando
container.registerSingleton<ICarRepository>(
  "CarRepository",
  CarRepository
);

// Injeção de dependência de upload de imagens de carros - ICarsImagesRepository
container.registerSingleton<ICarsImagesRepository>(
  'CarImagesRepositories', CarsImageRepository
);

//IRentalsRepository => vamos passar nossa interface de repositorio, eai vamos dar um nome para nosso registro
// para quando agente for usar esse nome ele já intendera qual classe estamos chamando
container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

//IUsersTokensRepository => vamos passar nossa interface de repositorio, eai vamos dar um nome para nosso registro
// para quando agente for usar esse nome ele já intendera qual classe estamos chamando
container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
