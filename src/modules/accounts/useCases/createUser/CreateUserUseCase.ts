import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/interface/IUsersRepository';
import { AppError } from '../../../../errors/AppError';


@injectable() //fazendo que nossoa clasee seja injetada por depedência
class CreateUseCase {
  constructor(
    @inject("UserRepository") //fazendo injeção de depedência
    private userRepositry: IUsersRepository
  ){}
  async execute({name, email, password, driver_license }: ICreateUserDTO): Promise<void>{

    const userAlreadyExists = await this.userRepositry.findByEmail(email)

    if(userAlreadyExists){
      throw new AppError("User already exists", 404);
    }

    const passwordHash = await hash(password, 8);

    await this.userRepositry.create({
      name, email, password: passwordHash, driver_license
    });
  }
}

export { CreateUseCase};