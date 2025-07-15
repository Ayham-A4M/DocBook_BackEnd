const express = require('express');
const router = express.Router();
const handleGetHolidays = require('../controller/public/handleGetHolidays');
const handleGetReport=require('../controller/public/handleGetReport')
const verifyUser=require('../middleware/verifyUser');
router.get('/api/public/holidays', handleGetHolidays);
router.get('/api/public/report',handleGetReport);
module.exports = router