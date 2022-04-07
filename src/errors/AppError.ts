export class AppError {
  public readonly message: string; //messagem do error que queremos passar
  public readonly statusCode: number; // status do Error

  constructor(message: string, statusCode = 400 ){
    this.message = message;
    this.statusCode = statusCode;
  }

}