import Account from '../models/Account';

import ICreateAccountDTO from '../dtos/accounts/ICreateAccountDTO';
import IUpdateAccountBalanceDTO from '../dtos/accounts/IUpdateAccountBalanceDTO';

class AccountsRepository {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  public create({ balance, accountType }: ICreateAccountDTO): Account {
    const account = new Account({ balance, accountType });

    this.accounts.push(account);

    return account;
  }

  public findAll(): Account[] {
    return this.accounts;
  }

  public updateBalance({ accountId, value }: IUpdateAccountBalanceDTO): void {
    const key = this.accounts.findIndex(
      account => account.id === accountId
    );

    this.accounts[key].balance -= value;
  }

  public findById(accountId: string): Account {
    const findAccount = this.accounts.find(
      account => account.id === accountId
    );

    return findAccount;
  }
}

export default AccountsRepository;
