import { uuid } from 'uuidv4';

class Transaction {
  id: string;

  accountId: string;

  value: number;

  operation: 'withdraw' | 'deposit';

  date: Date;

  constructor({ accountId, value, operation }: Omit<Transaction, 'id' | 'date'>) {
    this.id = uuid();
    this.accountId = accountId;
    this.value = value;
    this.operation = operation;
    this.date = new Date();
  }
}

export default Transaction;
