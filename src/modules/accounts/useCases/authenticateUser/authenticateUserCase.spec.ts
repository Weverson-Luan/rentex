import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { AuthenticationUseCase } from "@modules/accounts/useCases/authenticateUser/authenticateUserUseCase";
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { AppError} from '@shared/infra/http/errors/AppError'


let createUserUseCase: CreateUserUseCase;
let authenticateUseCase: AuthenticationUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Devo fazer Autenticação de usuário", ()=> {

   //ANTES DE QUALQUER COISA ELE EXECUTARA O BEFOREEACH.
   beforeEach(()=> {
    //vamos instância nossas classes
     usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUseCase = new AuthenticationUseCase(usersRepositoryInMemory);
  });

  // DEVE SER POSSIVIEL AUTENTICAR UM USUÁRIO.
  it("Deve ser possiviél autenticar um usuário.",async ()=> {
    const user: ICreateUserDTO = {
      name: "Luan",
      email: "luandev@gmail.com",
      password: "1234",
      driver_license: "MG-08732",   
    };

    // FAZENDO A CRIAÇÃO DO USUÁRIO
    await createUserUseCase.execute(user)
   
    //FAZENDO A AUTENTICAÇÃO DO USUÁRIO
    const userIsLogged = await authenticateUseCase.execute({
      email: user.email,
      password: user.password
    });

    // ESPERO QUE DENTRO DO MEU userIsLogged tenha uma propiedade chamada token
    expect(userIsLogged).toHaveProperty("token");

  });


  //ESPERO QUE NÃO DEVE SER CAPAZ DE AUTENTICAR UM EMAIL DE USUÁRIO INEXISTENTE
  it("ESPERO QUE NÃO DEVE SER CAPAZ DE AUTENTICAR UM EMAIL DE USUÁRIO INEXISTENTE", ()=> {
      expect(async()=> {
      //FAZENDO A AUTENTICAÇÃO DO USUÁRIO PARA VERIFICAR SE O EMAIL EXISTE.
        await authenticateUseCase.execute({
          email: "emailalredexist@gmail.com.br",
          password:"1234"
        });
      }).rejects.toBeInstanceOf(AppError);
  });


   //ESPERO QUE NÃO DEVE SER CAPAZ DE AUTENTICAR UM USUÁRIO COM A SENHA INCORRETA
   it("ESPERO QUE NÃO DEVE SER CAPAZ DE AUTENTICAR UM USUÁRIO COM A SENHA INCORRETA", ()=> {
    expect( async ()=> {
    //FAZENDO A AUTENTICAÇÃO DO USUÁRIO PARA VERIFICAR SE O A SENHA CORRESPONDE.
    const user: ICreateUserDTO = {
      name: "Luan",
      email: "luandev@gmail.com",
      password: "1234",
      driver_license: "MG-08732",   
    };

     // FAZENDO A CRIAÇÃO DO USUÁRIO
     await createUserUseCase.execute(user);

     await authenticateUseCase.execute({
        email: user.email,
        password: "passwordInvalid",
      });
    }).rejects.toBeInstanceOf(AppError);
  });


})