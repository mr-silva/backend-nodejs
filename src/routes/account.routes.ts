import { Router, response } from 'express';

import AccountsRepository from '../repositories/AccountsRepository';
import CreateAccountService from '../services/CreateAccountService';

const accountRouter = Router();
const accountsRepository = new AccountsRepository();

accountRouter.post('/', (req, res) => {
  try {
    const { accountType, balance } = req.body;

    const createAccount = new CreateAccountService(
      accountsRepository,
    );

    const account = createAccount.execute({
      accountType,
      balance,
    });

    return res.json(account);
  } catch(err) {
    return res.status(400).json({ error: err.message });
  }
});

accountRouter.get('/', (req, res) => {
  try {
    const accounts = accountsRepository.findAll();

    return res.json(accounts);
  } catch(err) {  
    return res.status(400).json({ error: err.message });
  }
});

export default accountRouter;
