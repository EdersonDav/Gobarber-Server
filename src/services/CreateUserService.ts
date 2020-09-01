import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';

interface UserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: UserDTO): Promise<User> {
    const userRepository = getRepository(User);

    const veryEmailIfExiste = await userRepository.findOne({
      where: { email },
    });

    if (veryEmailIfExiste) {
      throw new AppError('Email address already used');
    }

    const passwordHashd = await hash(password, 10);

    const userCreated = userRepository.create({
      name,
      email,
      password: passwordHashd,
    });

    await userRepository.save(userCreated);

    return userCreated;
  }
}

export default CreateUserService;
