const { expect } = require('chai');
const { it, describe } = require('mocha');

const UserRepository = require('../../../../app/Infrastructure/PostgreSQLRepository/DbUserRepository');
const email = 'admin@test.com';
const password = 'test123';

describe('DbUser Repository Test', () => {
    it.only('findAll()', async () => {
        const response = await UserRepository.findAll();
        console.log(response);
    });
    it('findByEmailAndPass()', async () => {
        const response = await UserRepository.findByEmailAndPass(email, password);
        console.log(response);
    });
    it('remove()', async () => {
        const response = await UserRepository.remove("1");
        console.log(response);
    })
});
