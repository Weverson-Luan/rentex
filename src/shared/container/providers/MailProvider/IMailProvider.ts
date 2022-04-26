interface IMailProvider {
  // 1° to => para quem vai ser enviado o email
  // 2° subject => assunto do email (oque você que enviar)
  // 3° body => html que pode ser customisavel (ao seu gosto)
  sendEmail(to: string, subject: string, variables: any, path: string): Promise<void>;
};

export { IMailProvider };
