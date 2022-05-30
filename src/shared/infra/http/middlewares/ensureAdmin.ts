import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/AppError";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction){
  //pegando o id que esta dentro da request
  const { id } = request.user;

  //fazendo instancia do meu repositorio
  const userRepository = new UserRepository();

  //fazer uma buscar no banco de dados para veririfcar se realmente esse ai pertece algum usuario
  const userAlreadyExists = await userRepository.findById(id);


  //se usuário não for admin iremos lançar um error
  if(!userAlreadyExists.isAdmin){
    throw new AppError("Usuário não tem permissão de admin 😪 !")
  };

  //caso ate aqui ocorreu bem tudo perfeito usuario e um admin prossigar.
  return next();


}