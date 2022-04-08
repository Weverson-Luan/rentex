import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from '@modules/accounts/useCases/interface/IUsersRepository';
import { AppError } from '@shared/infra/http/errors/AppError';

//interface de retorno
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string
} 

interface IRequest{
  email: string;
  password: string;

}
  @injectable() //fazendo que nossoa clasee seja injetada por depedência
  class AuthenticationUseCase {
    constructor(
      @inject("UserRepository")  //fazendo injeção de depedência
      private userRepository: IUsersRepository
      ){}
    async execute({ email, password }: IRequest): Promise<IResponse>{

      //verificar ser usuário existe.
      const user = await this.userRepository.findByEmail(email);

      if(!user){
        throw new AppError("Email or password incorrect", 404)
      };
      
      //se senha esta correta.
      const passwordMatch = await compare(password, user.password);

      if(!passwordMatch){
        throw new AppError("Email or password incorrect", 401)
      };

      //se a senha estiver correto eu gero o JWT.
      // 1. primeiro paarametro payload dados que você que passar no token
      // 2. uma string para o jwt se basear e gerar uma propia.
      // 3. uma string [subjectId], o id do usuário que está gerando o token e nesse obj passamos o tempo de experie
      const token = sign({}, "540c7b3fdcb1494cfb7e7b1d41ff9cde", {
        subject: String(user.id),
        expiresIn: '1d'
      });

      const tokenReturn: IResponse = {
        user: {
          name: user.name,
          email: user.email,
        },
        token
      }
      return tokenReturn;

    }
  }
  export { AuthenticationUseCase }; 