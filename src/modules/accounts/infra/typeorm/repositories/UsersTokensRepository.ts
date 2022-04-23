import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interface/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entity/UserTokens";


class UsersTokensRepository implements IUsersTokensRepository{

  private repository: Repository<UserTokens>;

  constructor(){
    this.repository = getRepository(UserTokens);
  }
  async create({ user_id, expires_date, refresh_token }: ICreateUsersTokenDTO): Promise<UserTokens> {

    const userToken = this.repository.create({ user_id, expires_date, refresh_token});

    await this.repository.save(userToken);

    return userToken;
  };

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
  
    const userToken = await this.repository.findOne({
      user_id,
      refresh_token

    })
    
    return userToken;
  };

  async deleteById(user_id: string): Promise<void> {
    await this.repository.delete(user_id);
  }
};

export { UsersTokensRepository };