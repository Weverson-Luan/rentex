import { inject, injectable } from "tsyringe";
import { resolve } from "path";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/interface/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interface/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/infra/http/errors/AppError";



@injectable()
class SendForgotPasswordUseCase {

  constructor(

    @inject("UserRepository") //fazendo injeção de depedência
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("MailProvider")
    private mailProvider: IMailProvider,
  ){}

  async execute(email: string): Promise<void>{

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs" );
    
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
    
    const variables = {
      name: userAlreadyExists.name,
    link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendEmail(email, 'Recuperação de senha', variables, templatePath);

  }
};

export { SendForgotPasswordUseCase };