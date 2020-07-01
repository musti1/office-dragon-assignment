const express = require('express');
const router = express.Router({});

const CompanyController = require('../Controllers/CompanyController');

router.post('/create', CompanyController.create);
router.put('/:companyId/update', CompanyController.updateCompany);
router.get('/list', CompanyController.companyList);
router.delete('/delete/:companyId', CompanyController.delete);
router.get('/:companyId', CompanyController.company);

module.exports = router;
