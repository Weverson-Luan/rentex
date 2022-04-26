import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from '@modules/accounts/repositories/interface/IUsersRepository';
import { AppError } from '@shared/infra/http/errors/AppError';
import { IUsersTokensRepository } from '../../repositories/interface/IUsersTokensRepository';
import auth from '@config/auth';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

//interface de retorno
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
} 

interface IRequest{
  email: string;
  password: string;

}
  @injectable() //fazendo que nossoa clasee seja injetada por depedência
  class AuthenticationUseCase {
    constructor(
      @inject("UserRepository")  //fazendo injeção de depedência
      private userRepository: IUsersRepository,

      @inject("UsersTokensRepository")  //fazendo injeção de depedência
      private usersTokensRepository: IUsersTokensRepository,

      @inject("DayjsDateProvider")
      private dateProvider: IDateProvider,


      ){}
    async execute({ email, password }: IRequest): Promise<IResponse>{

      //verificar ser usuário existe.
      const user = await this.userRepository.findByEmail(email);

      if(!user){
        throw new AppError("Email or password incorrect!")
      };
      
      //se senha esta correta.
      const passwordMatch = await compare(password, user.password);

      if(!passwordMatch){
        throw new AppError("Email or password incorrect!")
      };

      //se a senha estiver correto eu gero o JWT.
      // 1. primeiro paarametro payload dados que você que passar no token
      // 2. uma string para o jwt se basear e gerar uma propia.
      // 3. uma string [subjectId], o id do usuário que está gerando o token e nesse obj passamos o tempo de experie
      const token = sign({}, auth.secret_token, {
        subject: String(user.id),
        expiresIn: auth.expires_in_token
      });

      //criação refresh token

      const refresh_token = sign({email}, auth.secret_refresh_token, {
        subject: user.id,
        expiresIn: auth.expires_in_refresh_token
      });

      const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_in_refresh_toke_days);

      await this.usersTokensRepository.create({
        user_id: user.id,
        expires_date: refresh_token_expires_date,
        refresh_token: refresh_token
      })

      const tokenReturn: IResponse = {
        user: {
          name: user.name,
          email: user.email,
        },
        token,
        refresh_token
      }
      return tokenReturn;

    }
  }
  export { AuthenticationUseCase }; 