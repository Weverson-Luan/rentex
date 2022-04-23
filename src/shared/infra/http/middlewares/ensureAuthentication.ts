import { Request, Response, NextFunction} from "express";
import { verify } from 'jsonwebtoken';

import { AppError } from "@shared/infra/http/errors/AppError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPaylod {
  sub: string;
}
export async function ensureAuthentication(request: Request, response:Response, next: NextFunction){
  const authHeader = request.headers.authorization;
  const userTokenRepository = new UsersTokensRepository();


  // verificar se esta vindo o token no header
  if(!authHeader){
    throw new AppError("Token missing!", 401);
  };

  //vamos seperar o token do bearer por padraão ele vem asim Beader f5j7g5g13t363
  const [, token ] = authHeader.split(" ");


  //separamos o token do bearer vamos verificar o token para ver se os token ta ok
  //agora se o token estiver correto precisamos pega as informação contidas no token
  try {
  
   const { sub: user_id } =  verify(token, auth.secret_refresh_token) as IPaylod;
   console.log("vrify", user_id)
   
   
   //pegamos o id dentro do token agora vamos fazer uma buscar para ver se realmente existe 
   //esse usário em nosso banco de dados se sim vamos retorna-lo se não error neles.
  
   const user = await userTokenRepository.findByUserIdAndRefreshToken(user_id, token);

   //verificar se na busca ele me trouxe usuário
   if(!user){
     throw new AppError("User does not exists!", 404);
   }
//passando informação do usuario na requisição
   request.user = {
    id: user_id
   };
  return next();
    
  } catch (error) {
    throw new AppError("Invalid token!", 401)
  }

}