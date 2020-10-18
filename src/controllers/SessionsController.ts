import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../config/auth';

class SessionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      return response.status(404).json({
        status: 'error',
        message: 'Usuário não encontrado!',
      });
    }

    const matchedPassword  = await compare(password, user.password);

    if (!matchedPassword ) {
      return response.status(401).json({
        status: 'error',
        message: 'Senha incorreta',
      });
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    return response.status(201).json({
      user: { email: user.email },
      token,
    });
  }
}

export default SessionsController;
