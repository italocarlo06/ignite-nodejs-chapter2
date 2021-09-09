import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import  { deleteFile } from "../../../../utils/file";

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
    private usersRepository: IUsersRepository
  ){

  }

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    const old_avatar = user.avatar;
    
    if (!user){
      throw new AppError("User not found!");
    }

    user.avatar = avatar_file;
    await this.usersRepository.create(user);

    if (old_avatar){
      await deleteFile(`./tmp/avatar/${old_avatar}`);
    }
  }
}

export { UpdateUserAvatarUseCase }