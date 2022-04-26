import {container } from 'tsyringe';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';



const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
}
console.log(process.env.MAIL_PROVIDER)

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
);