import { injectable } from "tsyringe";
import nodemailer, { Transporter } from 'nodemailer';
import { IMailProvider } from "../IMailProvider";
import handlebars from "handlebars";
import fs from "fs";


@injectable()
class EtherealMailProvider implements IMailProvider{
  private client: Transporter;
  //responsavel por criar nossa conta
  constructor(){
    nodemailer.createTestAccount().then(account => {

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
          user: account.user,
          pass: account.pass
      },
      tls: {
        rejectUnauthorized: false
        }
      });

      this.client = transporter;

    }).catch( error => console.error(error))
  }
  async sendEmail(to: string, subject: string, variables: any, path: string): Promise<void> {
    //vamos fazer a leitura do arquivo que estamos recebendo;
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    //vamos utilizar o handlebars para fazer uma compilação para que ele possa entender o que tem no template
    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);


    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHTML,
    })
    
    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  };
};

export { EtherealMailProvider };