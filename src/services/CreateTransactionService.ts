import { inject, injectable } from 'tsyringe';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AccountsRepository from '../repositories/AccountsRepository';

import ICreateTransactionDTO from '../dtos/transactions/ICreateTransactionDTO';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository,
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,
  ) {}

  public async execute({ accountId, value, operation }: ICreateTransactionDTO): Promise<Transaction> {
    const checkOperationTypes = ['withdraw', 'deposit'];
    const accountData = await this.accountsRepository.findById(accountId);

    if (!accountData) {
      throw new AppError('Invalid account.');
    }

    if (!checkOperationTypes.includes(operation)) {
      throw new AppError('Operation type must be either withdraw or deposit.');
    }

    if (value <= 0) {
      throw new AppError('Invalid value.');
    }

    const { balance } = accountData;

    if (operation === 'withdraw' && (balance < value + 0.30 || value > 600)) {
      throw new AppError('Insuficient funds or value exceeds withdraw limit.');
    }

    const transaction = await this.transactionsRepository.create({
      accountId,
      value,
      operation,
    });

    await this.accountsRepository.updateBalance({
      accountId,
      value: operation === 'withdraw' ? (value + 0.30) * -1 : value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
