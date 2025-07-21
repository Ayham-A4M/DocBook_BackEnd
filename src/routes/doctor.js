const express = require('express');
const router = express.Router();
const verifyDoctor = require('../middleware/verifyDoctor')
// const upload = require('../utils/imageUpload');
const { upload } = require('../utils/vercelBlobImageUpload');
const handleCancelAppointment = require('../controller/doctor/handleCancelAppointment')
const handleGetDoctorAppointments = require('../controller/doctor/handleGetDoctorAppointments');
const handleConfirmAppointment = require('../controller/doctor/handleConfirmAppointment');
const handleGetReports = require('../controller/doctor/handleGetReports');
const handleArchiveReport = require('../controller/doctor/handleArchiveReport');
const handleGetComments = require('../controller/doctor/handleGetComments')
const handleGetDoctorProfile = require('../controller/doctor/handleGetDoctorProfile')
const handleUpdateProfile = require('../controller/doctor/handleUpdateProfile');
const handleGetBookings = require('../controller/doctor/handleGetBookings');
// validators
const validateReport = require('../validators/doctor/report.validator');
const validateUpdateProfile = require('../validators/doctor/updateProfile.validator');
// get routes
router.get('/api/doctor/getReports', verifyDoctor, handleGetReports);
router.get('/api/doctor/doctorAppointments', verifyDoctor, handleGetDoctorAppointments);
router.get('/api/doctor/getComments', verifyDoctor, handleGetComments);
router.get('/api/doctor/myProfile', verifyDoctor, handleGetDoctorProfile);
router.get('/api/doctor/bookings', verifyDoctor, handleGetBookings);
// post routes
router.post('/api/doctor/confirmAppointment', verifyDoctor, validateReport, handleConfirmAppointment);
router.post('/api/doctor/cancelAppointment', verifyDoctor, handleCancelAppointment);
router.post('/api/doctor/updateProfile', verifyDoctor, upload.single('image'), validateUpdateProfile, handleUpdateProfile);
// put routes
router.put('/api/doctor/archiveReport', verifyDoctor, handleArchiveReport);

module.exports = router;