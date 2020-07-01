const Company = require('../Core/Company');
const DbCompanyRepository = require('../../Infrastructure/PostgreSQLRepository/DbCompanyRepository');
const DdUserRepository = require('../../Infrastructure/PostgreSQLRepository/DbUserRepository');

class CompanyService {
  static async newCompany(name, description, tags, userId) {
    const company = Company.createFromDetails(name, description, tags, userId);
    return DbCompanyRepository.add(company);
  }

  static async allCompany(userId, term) {
    const user = await DdUserRepository.findByUserId(userId);

    if (user.role === 'ADMIN') {
      return DbCompanyRepository.findAll(term);
    } else {
      return DbCompanyRepository.findUserId(userId, term);
    }
  }

  static async singleCompany(companyId) {
    return DbCompanyRepository.findByCompanyId(companyId);
  }

  static async deleteCompany(companyId) {
    return DbCompanyRepository.remove(companyId);
  }

  static async updateCompany(name, description, tags, userId, companyId) {
    return DbCompanyRepository.update(companyId, {name, description, tags, userId});
  }
}

module.exports = CompanyService;
