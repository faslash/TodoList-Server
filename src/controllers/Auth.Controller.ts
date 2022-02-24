import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import  bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.model';
import handleErrors from '../utils/error.utils';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email }});

    if (!user) {
      return res.status(400).json(handleErrors(2, 'Usuário não encontrado!'));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json(handleErrors(2, 'Senha inválida!'));
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });
    
    return res.json({
      codigo: 1,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    })
    
  }
}

export default new AuthController();