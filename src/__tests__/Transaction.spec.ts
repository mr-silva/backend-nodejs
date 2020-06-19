import * as request from 'supertest';
import { isUuid } from 'uuidv4';
import { application } from '../application';

import AccountsRepository from '../repositories/AccountsRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

let accountsRepository: AccountsRepository;
let transactionsRepository: TransactionsRepository;
let createTransaction: CreateTransactionService;

describe('Account', () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository();
    transactionsRepository = new TransactionsRepository();

    createTransaction = new CreateTransactionService(
      transactionsRepository,
      accountsRepository,
    );
  });
  
  it('should be able to create a new transaction', async () => {
    const { body: account } = await request(application).post('/accounts').send({
      accountType: 'savings',
      balance: 1000,
    });

    const response = await request(application).post('/transactions').send({
      accountId: account.id,
      operation: 'deposit',
      value: 300,
    });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      accountId: account.id,
      operation: 'deposit',
      value: 300,
    });
  });

  it('should not be able to create a new transaction for invalid account', async () => {
    const response = await request(application).post('/transactions').send({
      accountId: 'fake-account-id',
      operation: 'deposit',
      value: 300,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  it('should not be able to create a new transaction with invalid operation', async () => {
    const { body: account } = await request(application).post('/accounts').send({
      accountType: 'savings',
      balance: 1000,
    });

    const response = await request(application).post('/transactions').send({
      accountId: account.id,
      operation: 'fake-operation',
      value: 300,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  it('should not be able to create a new transaction with invalid value', async () => {
    const { body: account } = await request(application).post('/accounts').send({
      accountType: 'savings',
      balance: 1000,
    });

    const response = await request(application).post('/transactions').send({
      accountId: account.id,
      operation: 'deposit',
      value: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  it('should not be able to exceed withdraw value', async () => {
    const { body: account } = await request(application).post('/accounts').send({
      accountType: 'savings',
      balance: 1000,
    });

    const response = await request(application).post('/transactions').send({
      accountId: account.id,
      operation: 'withdraw',
      value: 700,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  it('should be able increase account balance on a deposit', async () => {
    const { id } = await accountsRepository.create({
      accountType: 'current',
      balance: 500,
    });

    await createTransaction.execute({
      accountId: id,
      operation: 'deposit',
      value: 500,
    });

    await expect(
      accountsRepository.findById(id)
    ).resolves.toHaveProperty('balance', 1000);
  });  

  it('should be able decrease account balance on a withdraw', async () => {
    const { id } = await accountsRepository.create({
      accountType: 'current',
      balance: 500,
    });

    await createTransaction.execute({
      accountId: id,
      operation: 'withdraw',
      value: 300,
    });

    await expect(
      accountsRepository.findById(id)
    ).resolves.toHaveProperty('balance', 199.70);
  });  

  it('should not be able withdraw value when account has insuficient funds', async () => {
    const { id } = await accountsRepository.create({
      accountType: 'current',
      balance: 500,
    });

    await expect(
      createTransaction.execute({
        accountId: id,
        operation: 'withdraw',
        value: 500,
      }),
    ).rejects.toBeInstanceOf(Error);
  });  

  it('should not be able withdraw value when exceeds limit', async () => {
    const { id } = await accountsRepository.create({
      accountType: 'current',
      balance: 1000,
    });

    await expect(
      createTransaction.execute({
        accountId: id,
        operation: 'withdraw',
        value: 650,
      }),
    ).rejects.toBeInstanceOf(Error);
  });  
});
