import * as request from 'supertest';
import { isUuid } from 'uuidv4';
import { application } from '../application';

describe('Account', () => {
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

  it('should be able to list all accounts', async () => {
    await request(application).post('/accounts').send({
      accountType: 'savings',
      balance: 1000,
    });

    await request(application).post('/accounts').send({
      accountType: 'current',
      balance: 2000,
    });

    const response = await request(application).get('/accounts');

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          accountType: 'savings',
          balance: 1000,
        }),
        expect.objectContaining({
          id: expect.any(String),
          accountType: 'current',
          balance: 2000,
        }),
      ]),
    );
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
});
