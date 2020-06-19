import Transaction from '../models/Transaction';

import ICreateTransactionDTO from '../dtos/transactions/ICreateTransactionDTO';

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public async create({
    accountId, 
    value, 
    operation 
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction({
      accountId, 
      value,
      operation,
    });

    this.transactions.push(transaction);

    return transaction;
  }
  
  public async findByAccountId(accountId: string): Promise<Transaction[] | undefined> {
    const findTransactions = this.transactions.filter(
      transaction => transaction.accountId === accountId
    );

    return findTransactions;
  }
}

export default TransactionsRepository;
