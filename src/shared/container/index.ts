import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/interface/ICategoriesRepository';
import  { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';

import { ISpecificationsRepository } from '../../modules/cars/repositories/interface/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';

import { IUsersRepository } from '../../modules/accounts/useCases/interface/IUsersRepository';
import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';


//ICategoryRepositorie => vamos passar nossa interface de repositorio, eai vamos dar um nome para nosso registro
// para quando agente for usar esse nome ele já intendera qual classe estamos chamando
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);


//ISpecificationRepositorie => vamos passar nossa interface de repositorio, eai vamos dar um nome para nosso registro
// para quando agente for usar esse nome ele já intendera qual classe estamos chamando
container.registerSingleton<ISpecificationsRepository>(
  "ISpecificationsRepository",
  SpecificationsRepository
);

//IUsersRepository => vamos passar nossa interface de repositorio, eai vamos dar um nome para nosso registro
// para quando agente for usar esse nome ele já intendera qual classe estamos chamando
container.registerSingleton<IUsersRepository>(
  "UserRepository",
  UserRepository
);