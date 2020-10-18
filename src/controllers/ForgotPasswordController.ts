import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Transport from '../config/mailer';

import User from '../models/User';
import Token from '../models/Token';

class ForgotPasswordController {
  public async store(request: Request, response: Response): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email: request.body.email },
    });

    if (!user) {
      return response.status(404).json({
        status: 'error',
        message: 'Usuário não encontrado!',
      });
    }

    const tokensRepository = getRepository(Token);

    const { token } = await tokensRepository.save(
      tokensRepository.create({ user_id: user.id })
    );

    await Transport.sendMail({
      to: {
        name: user.email,
        address: user.email,
      },
      subject: 'Recuperação de senha',
      text: `http://192.168.100.52:5000/reset-password?token=${token}`
    });

    return response.status(204).send();
  }
}

export default ForgotPasswordController;
