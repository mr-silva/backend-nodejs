import * as request from 'supertest';
import { isUuid } from 'uuidv4';
import { application } from '../application';

import AccountsRepository from '../repositories/AccountsRepository';
import CreateAccountService from '../services/CreateAccountService';

let accountsRepository: AccountsRepository;
let createAccount: CreateAccountService;

describe('Account', () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository();
    createAccount = new CreateAccountService(accountsRepository);
  });
  
  it('should be able to create a new account', async () => {
    const response = await request(application).post('/accounts').send({
      accountType: 'savings',
      balance: 1000,
    });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      accountType: 'savings',
      balance: 1000,
    });
  });

  it('should not be able to create new account with invalid account type', async () => {
    const response = await request(application).post('/accounts').send({
      accountType: 'invalid-type',
      balance: 1000,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  it('should not be able to create new account with negative balance', async () => {
    const response = await request(application).post('/accounts').send({
      accountType: 'current',
      balance: -1,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  it('should be able to list one account', async () => {
    const account = await createAccount.execute({
      accountType: 'savings',
      balance: 500,
    });

    await expect(
      accountsRepository.findById(account.id)
    ).resolves.toHaveProperty('accountType');
  });

  it('should be able to update account balance', async () => {
    const account = await createAccount.execute({
      accountType: 'savings',
      balance: 500,
    });

    await expect(
      accountsRepository.updateBalance({
        accountId: account.id,
        value: 300
      })
    ).resolves.toMatchObject({
      id: account.id,
      accountType: 'savings',
      balance: 800,
    });    
  });
});
