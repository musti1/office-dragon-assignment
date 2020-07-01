const {expect} = require('chai');
const {it, describe} = require('mocha');

const DbCompanyRepository = require('../../../../app/Infrastructure/PostgreSQLRepository/DbCompanyRepository');
const Company = require('../../../../app/Domain/Core/Company');

describe('DbCompany Repository Test', () => {
  it('add()', async () => {
    const response = await DbCompanyRepository.add(Company.createFromDetails("Test", "Test", ["tag"], "abc"));
    expect(response).to.be.true;
  });
  it.only('findAll()', async () => {
    const response = await DbCompanyRepository.findAll("");
    expect(response).to.be.equal([Company]);
  });
  it('findByEmailAndPass()', async () => {
    const response = await DbCompanyRepository.findByCompanyId("1");
    expect(response).to.be.equal(User);
  });
  it('remove()', async () => {
    const response = await UserRepository.remove("1");
    expect(response).to.be.true;
  })
});
