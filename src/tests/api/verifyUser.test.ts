import usermodel from '../../models/user.model';
import DB_CONNECTION from '../../lib/Database';

import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { POST as VerifyUserHandler } from '../../app/api/verify-user/route';


describe("User Verification process.", () => {
    beforeEach(async () => {
        await DB_CONNECTION();
        await usermodel.findOneAndDelete({

            email: "testingverify@example.com",
            username: "testingverify",
        });

    })
    afterAll(async () => {
        await DB_CONNECTION();
        await usermodel.findOneAndDelete({
            email: "testingverifyr@example.com",
            username: "testingverify",
        });

    })


    it("should verify the user", async () => {
        const oneHourLater = new Date(Date.now() + 60 * 60 * 1000);

        await usermodel.create({
            username: "testingverify",
            email: "testingverifyr@example.com",
            password: "testingverify",
            messages: [],
            verifycode: "ZAINUL",
            expiryverifycode: oneHourLater,
            isverified: false,


        });
        const userData = {

            username: 'testingverify',
            code: 'ZAINUL'

        };

        const req = new Request('http://localhost:3000/api/verify-user', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' },
        });


        const res = await VerifyUserHandler(req);
        const json = await res?.json();


        expect(res?.status).toBe(201);
        expect(json).toMatchObject({ message: "User verified successfully." });


    });
})
