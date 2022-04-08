import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/useCases/interface/IUsersRepository';
import { deletedFile } from '../../../../utils/file';

interface IRquest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdatedUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ){}
  async execute({user_id, avatar_file}: IRquest): Promise<void>{
    const user = await this.userRepository.findById(user_id);

    if(user.avatar){
     await deletedFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;

    await this.userRepository.create(user); 

  }  
}

export { UpdatedUserAvatarUseCase };