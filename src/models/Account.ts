import { uuid } from 'uuidv4';

import Transaction from './Transaction';

class Account {
  id: string;

  balance: number;

  accountType: 'savings' | 'current';

  transactions: Transaction[];

  constructor({ balance, accountType }: Omit<Account, 'id' | 'transactions'>) {
    this.id = uuid();
    this.balance = balance;
    this.accountType = accountType;
    this.transactions = [];
  }
}

export default Account;
