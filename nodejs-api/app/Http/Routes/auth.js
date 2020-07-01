const express = require('express');
const router = express.Router({});

const AuthController = require('../Controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/sign-up', AuthController.signUp);

module.exports = router;
