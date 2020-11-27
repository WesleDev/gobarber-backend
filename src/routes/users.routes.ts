import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

/**
 *  Repositories
 *  Services
 */

// fiz pra sair o erro do typescript no delete user.password
interface Request {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: Request = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
