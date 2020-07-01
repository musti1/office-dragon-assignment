const Company = require('../../Domain/Core/Company');
const companyModel = require('../Models/CompanyModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class DbCompanyRepository {
  /**
   * Add Company in database
   * @param {Company} company
   * @return Promise<boolean>
   */
  static async add(company) {
    try {
      await companyModel.create(company.toStoreObject());
      return true
    } catch {
      throw new Error('Failed to add company');
    }
  }

  /**
   * Find All Companies of a user from database
   * @param {string} userId
   * @param {string} term
   * @return {Company[]}
   */
  static async findUserId(userId, term) {
    try {
      let query = {where: {userId}};
      if (term.length > 0) {
        query = {
          where: {
            name: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${term}%`
            ),
            userId: userId
          }
        }
      }
      const companyObjs = await companyModel.findAll(query);
      return companyObjs.map((companyObj) => {
        return Company.createFromObject(companyObj);
      });
    } catch {
      throw new Error('Unable to get Companies');
    }
  }

  /**
   * Find All Company from database
   * @param {String} term
   * @return {Company[]}
   */
  static async findAll(term) {
    try {
      let query = {};
      if (term.length > 0) {
        query = {
          where: {
            name: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${term}%`
            )
          }
        }
      }
      const companyObjs = await companyModel.findAll(query);
      return companyObjs.map((companyObj) => {
        return Company.createFromObject(companyObj);
      });
    } catch (e) {
      console.log(e)
      throw new Error('Unable to get Companies');
    }
  }

  /**
   * Find Company by Company Id from database
   * @param {string} companyId
   * @param {string} term
   * @return {Company}
   */
  static
  async findByCompanyId(companyId, term) {
    try {
      const companyObj = await companyModel.findOne({
        where: {
          companyId
        }
      });
      return Company.createFromObject(companyObj);

    } catch {
      throw new Error();
    }
  }

  /**
   * Update Company in database
   * @param {String} companyId
   * @param {Object} company
   * @return Promise<boolean>
   */
  static
  async update(companyId, company) {
    try {
      await companyModel.update(company, {where: {companyId}});
      return true
    } catch (e) {
      throw new Error('Failed to add company');
    }
  }

  /**
   * Delete Company from database by Company Id
   * @param {string} companyId
   * @return Promise<boolean>
   */
  static
  async remove(companyId) {
    try {
      await companyModel.destroy({
        where: {
          companyId
        }
      });
      return true
    } catch {
      throw new Error();
    }
  }
}

module
  .exports = DbCompanyRepository;
