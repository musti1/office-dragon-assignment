const { expect } = require('chai');
const { it, describe } = require('mocha');

const UserRepository = require('../../../../app/Infrastructure/PostgreSQLRepository/DbUserRepository');
const User = require('../../../../app/Domain/Core/User');
const email = 'admin@test.com';
const password = 'test123';

describe('DbUser Repository Test', () => {
    it.only('findAll()', async () => {
        const response = await UserRepository.findAll();
        expect(response).to.be.equal([User]);
    });
    it('findByEmailAndPass()', async () => {
        const response = await UserRepository.findByEmailAndPass(email, password);
        expect(response).to.be.equal(User);
    });
    it('remove()', async () => {
        const response = await UserRepository.remove("1");
        expect(response).to.be.true;
    })
});
