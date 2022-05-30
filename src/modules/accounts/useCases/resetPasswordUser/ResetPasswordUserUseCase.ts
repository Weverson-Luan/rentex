import { IUsersRepository } from "@modules/accounts/repositories/interface/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interface/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("UserRepository") //fazendo injeção de depedência
    private usersRepository: IUsersRepository,
  ){}

  async execute({ token, password }: IRequest):Promise<void>{
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if(!userToken){
      throw new AppError("Token invalid!");
    };

    //verificar se o token ja passou da data de expiração
    if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
      throw new AppError("Token expired!");
    };

    //fazer uma busca no banco pra ver se realmente temos esse usuário
    const user = await this.usersRepository.findById(userToken.user_id);

    //criptografando a senha e atulizando o campo password dentro de user
    user.password = await hash(password, 8)

    //fazendo updated
    await this.usersRepository.create(user);

    //vamos remover o token
    await this.usersTokensRepository.deleteById(userToken.id)

  }
};

export { ResetPasswordUserUseCase };