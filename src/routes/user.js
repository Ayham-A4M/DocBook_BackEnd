const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const handleGetDoctors = require('../controller/user/handleGetDoctors');
const handleGetDoctorById = require('../controller/user/handleGetDoctorById')
const handleTakeAppointment = require('../controller/user/handleTakeAppointment')
const handleGetMyAppointments = require('../controller/user/handleGetMyAppointments');
const handleCancelAppointment = require('../controller/user/handleCancelAppointment')
const handleGetTakedAppointments = require('../controller/user/handleGetTakedAppointments');
const handleRateDoctor = require('../controller/user/handleRateDoctor')
const handleSendMessage = require('../controller/user/handleSendMessage');
// validators
const validateAppointment = require('../validators/user/appointment.validator');
const validateRateDoctor = require('../validators/user/rateDoctor.validator');
// get methods
router.get('/api/user/getdoctors', handleGetDoctors);
router.get('/api/user/getdoctor', handleGetDoctorById);
router.get('/api/user/takedappointments', verifyUser, handleGetTakedAppointments);
router.get('/api/user/myappointments', verifyUser, handleGetMyAppointments);

// post methods
router.post('/api/user/takeappointment', verifyUser, validateAppointment, handleTakeAppointment);
router.post('/api/user/cancelAppointment', verifyUser, handleCancelAppointment);
router.post('/api/user/rateDoctor', verifyUser, validateRateDoctor, handleRateDoctor);
router.post('/api/user/sendMessage', handleSendMessage);


module.exports = router