import { IUsersRepository } from "@modules/accounts/repositories/interface/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interface/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";


@injectable()
class SendForgotPasswordUseCase {

  constructor(

    @inject("UserRepository") //fazendo injeção de depedência
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider,
  ){}

  async execute(email: string): Promise<void>{

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    
    //se não existir usuário com esse email lançamos um error
    if(!userAlreadyExists){
      throw new AppError("User does not exists !")
    };

    //gerar um token pro usuário acessar o link para alterar sua senha
    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3); //criando horas 
   
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: userAlreadyExists.id,
      expires_date
    });
    

    await this.mailProvider.sendEmail(email, "Recuperação de senha", ` O link para o reset e é ${token}`)

  }
};

export { SendForgotPasswordUseCase };