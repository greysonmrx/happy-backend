import { Request, Response } from 'express';
import { addHours, isAfter } from 'date-fns';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Token from '../models/Token';
import User from '../models/User';

class ResetPasswordController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    const tokensRepository = getRepository(Token);

    const userToken = await tokensRepository.findOne({ where: { token } })

    if (!userToken) {
      return response.status(404).json({
        status: 'error',
        message: 'Token não encontrado!',
      });
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userToken.user_id);

    if (!user) {
      return response.status(404).json({
        status: 'error',
        message: 'Usuário não encontrado!',
      });
    }

    const tokenCraetedAt = userToken.created_at;
    const compareDate = addHours(tokenCraetedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      return response.status(401).json({
        status: 'error',
        message: 'Token expirado!',
      });
    }

    const randomPassword = Math.random().toString(36).slice(-6);

    user.password = await hash(randomPassword, 8);

    await usersRepository.save(user);

    return response.send(`
      Sua nova senha é ${randomPassword}. Salve ela em algum local seguro para não se equecer!
    `);
  }
}

export default ResetPasswordController;
