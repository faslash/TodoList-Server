import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from '../models/User.model';

class UserController {
  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { name, email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });
    
    if (userExists) {
      return res.sendStatus(409);
    }

    const created_at = new Date();
    const updated_at = new Date();

    const user = repository.create({ name, email, password,  created_at, updated_at});
    await repository.save(user);

    return res.json(user);
    
  }
}

export default new UserController();