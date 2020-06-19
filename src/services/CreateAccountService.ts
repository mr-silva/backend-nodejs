import { inject, injectable } from 'tsyringe';

import Account from '../models/Account';
import AccountsRepository from '../repositories/AccountsRepository';

import ICreateAccountDTO from '../dtos/accounts/ICreateAccountDTO';

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,
  ) {}

  public async execute({ accountType, balance }: ICreateAccountDTO): Promise<Account> {
    const checkAccountTypes = ['savings', 'current'];

    if (!checkAccountTypes.includes(accountType)) {
      throw new Error('Account type must be either savings or current.');
    }

    if (balance < 0) {
      throw new Error('Account balance must be at least 0.');
    }

    const account = this.accountsRepository.create({
      accountType,
      balance,
    });

    return account;
  }
}

export default CreateAccountService;
