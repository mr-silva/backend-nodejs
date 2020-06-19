export default interface ICreateTransactionDTO {
  accountId: string;
  value: number;
  operation: 'withdraw' | 'deposit';
}