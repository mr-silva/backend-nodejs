import Account from '../models/Account';
import AccountsRepository from '../repositories/AccountsRepository';

import ICreateAccountDTO from '../dtos/accounts/ICreateAccountDTO';

class CreateAccountService {
  private accountsRepository: AccountsRepository;

  constructor(accountsRepository: AccountsRepository) {
    this.accountsRepository = accountsRepository;
  }

  public execute({ accountType, balance }: ICreateAccountDTO): Account {
    const checkAccountTypes = ['savings', 'current'];

    if (!checkAccountTypes.includes(accountType)) {
      throw Error('Account type must be either savings or current.');
    }

    if (balance < 0) {
      throw new Error('Account balance must be at least 0');
    }

    const account = this.accountsRepository.create({
      accountType,
      balance,
    });

    return account;
  }
}

export default CreateAccountService;
