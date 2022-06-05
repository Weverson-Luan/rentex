import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entity/User";
import { IUsersRepository } from "@modules/accounts/repositories/interface/IUsersRepository";

class UserRepository implements IUsersRepository{
  private repository : Repository<User>;

  constructor(){
    this.repository = getRepository(User);
  }

  async create({name, isAdmin, email, password, driver_license, id, avatar }: ICreateUserDTO): Promise<void> {
    
  const user = this.repository.create({
    name,
    isAdmin,
    email,
    password,
    driver_license,
    id,
    avatar
  });
  await this.repository.save(user);
  }

 async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({email});
    return user;
  }
  
  async findById(user_id: string): Promise<User> {
    const user = await this.repository.findOne(user_id);
    return user;
  }
}

export { UserRepository };