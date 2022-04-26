import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DaysDateProvider';
import { AppError } from '@shared/infra/http/errors/AppError';
import { AuthenticationUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticationUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Autenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticationUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('shoulde be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      name: 'Test User',
      email: 'test@example.com',
      password: '123',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: 'false@email.com', password: '123' });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000123',
        name: 'Password Error',
        email: 'test@example.com',
        password: '123',
      };

      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({ email: user.email, password: 'incorretPassword' });
    }).rejects.toBeInstanceOf(AppError);
  });
});