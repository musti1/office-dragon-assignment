const uuid = require('uuid/v1');

class Company {
  constructor(
    companyId,
    name,
    description,
    tags,
    userId
  ) {
    this.companyId = companyId;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.userId = userId;
  }

  toStoreObject() {
    return {
      companyId: this.companyId,
      name: this.name,
      description: this.description,
      tags: this.tags,
      userId: this.userId
    }
  }

  static createFromDetails(name, description, tags, userId) {
    return new Company(
      uuid(),
      name,
      description,
      tags,
      userId
    )
  }

  static createFromObject(companyObj) {
    return new Company(
      companyObj.companyId,
      companyObj.name,
      companyObj.description,
      companyObj.tags,
      companyObj.userId
    );
  }
}

module.exports = Company;
