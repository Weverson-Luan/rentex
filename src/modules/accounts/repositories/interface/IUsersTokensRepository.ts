import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entity/UserTokens";


interface IUsersTokensRepository {
  create({ user_id, expires_date, refresh_token }: ICreateUsersTokenDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;
  deleteById(user_id: string): Promise<void>;
};

export { IUsersTokensRepository };