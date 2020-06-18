import { uuid } from 'uuidv4';

class Account {
  id: string;

  balance: number;

  accountType: 'savings' | 'current';

  constructor({ balance, accountType }: Omit<Account, 'id'>) {
    this.id = uuid();
    this.balance = balance;
    this.accountType = accountType;
  }
}

export default Account;
