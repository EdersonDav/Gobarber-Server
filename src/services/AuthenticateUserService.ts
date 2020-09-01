import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import User from '../models/User';
import authConfig from '../config/auth';

interface UserAuthDTO {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: UserAuthDTO): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const correctPassword = await compare(password, user.password);

    if (!correctPassword) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.JWT;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
