import usermodel from '../../models/user.model';
import DB_CONNECTION from '../../lib/Database';



import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { POST as signupHandler } from '../../app/api/sign-up/route';

describe('sign-up api testing', () => {
  beforeEach(async () => {
     await DB_CONNECTION();
    await usermodel.findOneAndDelete({

      email: "testuser@example.com",
      username: "testuser",
    });

  })
  afterAll(async () => {
    await DB_CONNECTION();
    await usermodel.findOneAndDelete({
      email: "testuser@example.com",
      username: "testuser",
    });

  })

  it('Should sign-up the new user', async () => {
    const userData = {
      email: 'testuser@example.com',
      password: 'Password123!',
      username: 'testuser',
    };

    // Simulate a Next.js Request
    const req = new Request('http://localhost:3000/api/sign-up', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await signupHandler(req);
    const json = await res?.json();

    expect(res?.status).toBe(200);
    expect(json).toMatchObject({ message: "User signed-up successfully." }); // adjust to your route
  });

  it('Should not sign-up the new user (All details not given.) ', async () => {
    const userData = {

      password: 'Password123!',
      username: 'testuser',
    };

    // Simulate a Next.js Request
    const req = new Request('http://localhost:3000/api/sign-up', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await signupHandler(req);
    const json = await res?.json();

    expect(res?.status).toBe(400);
    expect(json).toMatchObject({ message: "Please Enter full details." }); // adjust to your route
  });

  it('Should sign-up the new user (previous user didn`t verify the account', async () => {
    await DB_CONNECTION();
    const oneHourLater = new Date(Date.now() + 60 * 60 * 1000);
    await usermodel.create({
      email: 'testuser@example.com',
      password: 'P12332434!',
      username: 'testuser',
      messages: [],
      verifycode: "pkw142",
      expiryverifycode: oneHourLater,
      isverified:false,

    })
    const userData = {
      email: 'testuser@example.com',
      password: 'Password123!',
      username: 'testuser',
    };

    // Simulate a Next.js Request
    const req = new Request('http://localhost:3000/api/sign-up', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await signupHandler(req);
    const json = await res?.json();

    expect(res?.status).toBe(200);
    expect(json).toMatchObject({ message: "User signed-up successfully." }); // adjust to your route
  });
  it('Should not sign-up the new user (User with these credentials already exists.)', async () => {
    await DB_CONNECTION();
    const oneHourLater = new Date(Date.now() + 60 * 60 * 1000);
    await usermodel.create({
      email: 'testuser@example.com',
      password: 'P12332434!',
      username: 'testuser',
      messages: [],
      verifycode: "pkw142",
      expiryverifycode: oneHourLater,
      isverified:true,

    })
    const userData = {
      email: 'testuser@example.com',
      password: 'Password123!',
      username: 'testuser',
    };

    // Simulate a Next.js Request
    const req = new Request('http://localhost:3000/api/sign-up', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await signupHandler(req);
    const json = await res?.json();

    expect(res?.status).toBe(400);
    expect(json).toMatchObject({ message: "Email already in use." }); // adjust to your route
  });
});

