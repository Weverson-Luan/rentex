import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/interface/IUsersRepository';
import { deletedFile } from '@utils/file';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRquest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdatedUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ){}
  async execute({user_id, avatar_file}: IRquest): Promise<void>{
    const user = await this.userRepository.findById(user_id);

    //caso já exista esse avatar vamos remove-lo
    if(user.avatar){
     await this.storageProvider.delete(avatar_file, "avatar")
    };

    //vamos adicionar um novo file na pasta de avatar em tmp
    await this.storageProvider.save(avatar_file, "avatar");

    user.avatar = avatar_file;

    await this.userRepository.create(user); 

  }  
}

export { UpdatedUserAvatarUseCase };