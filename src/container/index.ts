import { container } from 'tsyringe';

import AccountsRepository from '../repositories/AccountsRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';

container.registerSingleton(
  'AccountsRepository',
  AccountsRepository,
);

container.registerSingleton(
  'TransactionsRepository',
  TransactionsRepository,
);
