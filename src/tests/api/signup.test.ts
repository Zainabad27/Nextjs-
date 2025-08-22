// import dotenv from "dotenv";
// dotenv.config({ path: ".env.test" });



import { describe, it, expect, beforeAll } from 'vitest';
import { POST as signupHandler } from '../../app/api/sign-up/route';

describe('sign-up api testing', () => {
   
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
});

