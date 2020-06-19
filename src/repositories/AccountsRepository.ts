import Account from '../models/Account';

import ICreateAccountDTO from '../dtos/accounts/ICreateAccountDTO';
import IUpdateAccountBalanceDTO from '../dtos/accounts/IUpdateAccountBalanceDTO';

class AccountsRepository {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  public async create({ balance, accountType }: ICreateAccountDTO): Promise<Account> {
    const account = new Account({ balance, accountType });

    this.accounts.push(account);

    return account;
  }

  public async updateBalance({ accountId, value }: IUpdateAccountBalanceDTO): Promise<Account> {
    const key = this.accounts.findIndex(
      account => account.id === accountId
    );

    this.accounts[key].balance += value;

    return this.accounts[key];
  }

  public async findById(accountId: string): Promise<Account | undefined> {
    const findAccount = this.accounts.find(
      account => account.id === accountId
    );

    return findAccount;
  }
}

export default AccountsRepository;
