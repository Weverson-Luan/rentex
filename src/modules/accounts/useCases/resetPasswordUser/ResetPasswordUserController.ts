import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserUseCase";

class ResetPasswordUserController {

  async handle(request: Request, response: Response): Promise<Response>{
      const { token } = request.query;// vem da url
      const { password } = request.body; // no corpo 
      const tokenFormatted = String(token); //transformando token em string
      const resetPasswordUseCase = container.resolve(ResetPasswordUserUseCase)


      await resetPasswordUseCase.execute({ token: tokenFormatted, password});

      return response.send()
  }
};

export { ResetPasswordUserController };