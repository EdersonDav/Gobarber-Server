import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

interface avatarDTO {
  userId: string;
  fileName: string;
}

class UpdatedUserAvatar {
  public async execute({ userId, fileName }: avatarDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExiste = await fs.promises.stat(userAvatarPath);

      if (userAvatarExiste) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = fileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdatedUserAvatar;
