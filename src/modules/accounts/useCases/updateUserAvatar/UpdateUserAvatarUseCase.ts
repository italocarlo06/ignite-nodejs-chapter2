import { injectable, inject } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import  { deleteFile } from "@utils/file";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest{
  user_id: string;
  avatar_file: string;
}

interface IImportAvatar{
  url: string;
}

@injectable()
class UpdateUserAvatarUseCase{
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider : IStorageProvider
  ){

  }

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    const old_avatar = user.avatar;

    if (old_avatar){
      await this.storageProvider.delete(old_avatar, "avatar");
    } 
    await this.storageProvider.save(avatar_file, "avatar");
    
    if (!user){
      throw new AppError("User not found!");
    }

    user.avatar = avatar_file;
    await this.usersRepository.create(user);

  }
}

export { UpdateUserAvatarUseCase }