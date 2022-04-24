import {container } from 'tsyringe';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';



container.registerSingleton<IMailProvider>(
  "EtherealMailProvider",
  EtherealMailProvider
);