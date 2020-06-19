import { inject, injectable } from 'tsyringe';

import Account from '../models/Account';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AccountsRepository from '../repositories/AccountsRepository';

@injectable()
class ListAccountTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository,
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,
  ) {}

  public async execute(accountId: string): Promise<Account> {
    const account = await this.accountsRepository.findById(accountId);

    if (!account) {
      throw new Error('Invalid account.');
    }

    const accountTransactions = await this.transactionsRepository.findByAccountId(accountId);

    return {...account, transactions: accountTransactions};
  }
}

export default ListAccountTransactionsService;
