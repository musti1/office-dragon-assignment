const CompanyService = require('../../Domain/Services/CompanyService');

const CompanyController = {};

CompanyController.create = async (req, res) => {
  try {
    const {authorization} = req.headers;
    const {name, description, tags} = req.body;
    const company = await CompanyService.newCompany(name, description, tags, authorization);
    if (company) {
      return res.json({success: 'Company Created'});
    }
    return res.status(400).json({error: 'Failed to create Company'});
  } catch {
    return res.status(500).send({error: 'Server Error'});
  }
};

CompanyController.updateCompany = async (req, res) => {
  try {
    const {authorization} = req.headers;
    const {companyId} = req.params;
    const {name, description, tags} = req.body;

    const company = await CompanyService.updateCompany(name, description, tags, authorization, companyId);
    if (company) {
      return res.json({success: 'Company Created'});
    }
    return res.status(400).json({error: 'Failed to create Company'});
  } catch {
    return res.status(500).send({error: 'Server Error'});
  }
};

CompanyController.companyList = async (req, res) => {
  try {
    const {authorization} = req.headers;
    const {term, pageNo} = req.query;
    const companyList = await CompanyService.allCompany(authorization, term);
    return res.json(companyList);
  } catch {
    return res.status(500).send({error: 'Server Error'});
  }
};

CompanyController.company = async (req, res) => {
  try {
    const {companyId} = req.params;
    const company = await CompanyService.singleCompany(companyId);
    return res.json(company);
  } catch {
    return res.status(500).send({error: 'Server Error'});
  }
};

CompanyController.delete = async (req, res) => {
  try {
    const {companyId} = req.params;
    const deleted = await CompanyService.deleteCompany(companyId);
    if (deleted) {
      return res.json({success: 'Company deleted'});
    }
    return res.status(400).json({error: 'Unable to delete the Company'});
  } catch {
    return res.status(500).send({error: 'Server Error'});
  }
};

module.exports = CompanyController;
