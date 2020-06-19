import { Router } from 'express';
import { container } from 'tsyringe';

import CreateAccountService from '../services/CreateAccountService';

const accountRouter = Router();

accountRouter.post('/', async (req, res) => {
  try {
    const { accountType, balance } = req.body;

    const createAccount = container.resolve(CreateAccountService);

    const account = await createAccount.execute({
      accountType,
      balance,
    });

    return res.json(account);
  } catch(err) {
    return res.status(400).json({ error: err.message });
  }
});

export default accountRouter;
