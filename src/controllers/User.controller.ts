import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../models/User.model";
import handleErrors from "../utils/error.utils";

class UserController {
  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { name, email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json(handleErrors(2, `Usuário já cadastrado`));
    }

    const created_at = new Date();
    const updated_at = new Date();

    const user = repository.create({
      name,
      email,
      password,
      created_at,
      updated_at,
    });

    await repository
      .save(user)
      .then(() => {
        res.status(201).json({
          retorno: {
            codigo: 1,
            mensagem: "Usuário criado com sucesso!",
          },
        });
      })
      .catch((error) => {
        res.status(500).json(handleErrors(2, `Erro interno no servidor: ${error}`));
      });
  }
}

export default new UserController();
