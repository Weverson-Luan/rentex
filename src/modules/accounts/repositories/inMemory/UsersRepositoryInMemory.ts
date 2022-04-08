import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entity/User";
import { IUsersRepository } from "../../useCases/interface/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository{

  users: User[] = []; //iniciando um const de categorias com um Array vazio.
 async findById(id: string): Promise<User> {
    const user = this.users.find((user)=> user.id === id );

    return user;
  }

  async findByEmail(email: string): Promise<User> {
  const user = this.users.find((user)=> user.email === email );

  return user;
  }

  async create({ name, email, password, driver_license, id, avatar }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name, email, password, driver_license, id, avatar
    })

    this.users.push(user);
  };
}
export { UsersRepositoryInMemory}