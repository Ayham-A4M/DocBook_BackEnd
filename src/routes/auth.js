const express = require('express');
const router = express.Router();
const handleRegisterUser = require('../controller/auth/handleRegisterUser')
const handleLogin = require('../controller/auth/handleLogin')
const handleRefreshToken = require('../controller/auth/handleRefreshToken')
const handleGetUser = require('../controller/auth/handleGetUser');
const handleLogout = require('../controller/auth/handleLogout');
// validators middleware
const validateRegister = require('../validators/auth/register.validator');
const validateLogin = require('../validators/auth/login.validator');
// 
router.post('/api/auth/userRegister', validateRegister, handleRegisterUser)
router.post('/api/auth/login', validateLogin, handleLogin);
router.post('/api/auth/refreshtoken', handleRefreshToken)
router.post('/api/auth/logout', handleLogout);
router.get('/api/auth/getuser', handleGetUser);



module.exports = router