const express = require('express');
const router = express.Router();
const createDoctor = require('../controller/admin/createDoctor');
const upload = require('../utils/imageUpload');
const verifyAdmin = require('../middleware/verifyAdmin');
const handleGetStatistics = require('../controller/admin/handleGetStatistics');
const handleGetAllDoctors = require('../controller/admin/handleGetAllDoctors');
const handleDeleteDoctor = require('../controller/admin/handleDeleteDoctor');
const handleEditDoctor = require('../controller/admin/handleEditDoctor');
const handleCreateHoliday = require('../controller/admin/handleCreateHoliday');
const handleDeleteHoliday = require('../controller/admin/handleDeleteHoliday');
const handleGetAllUsers = require('../controller/admin/handleGetAllUsers');
const handleGetDoctorProfile = require('../controller/admin/handleGetDoctorProfile');
const handleDeleteUser = require('../controller/admin/handleDeleteUser');
// validator
const validateNewDoctor = require('../validators/admin/newDoctor.validator');
const validateUpdateDoctor = require('../validators/admin/updateDoctor.validator')
const validateHoliday = require('../validators/admin/holiday.validator');
// router.use(verifyAdmin);
router.post('/api/admin/createdoctor', verifyAdmin, upload.single('image'), validateNewDoctor, createDoctor)
router.post('/api/admin/editDoctor', verifyAdmin, validateUpdateDoctor, handleEditDoctor);
router.post('/api/admin/createHoliday', verifyAdmin, validateHoliday, handleCreateHoliday);
router.post('/api/admin/deleteHoliday', verifyAdmin, handleDeleteHoliday)


router.get('/api/admin/dashboard', verifyAdmin, handleGetStatistics);
router.get('/api/admin/users', verifyAdmin, handleGetAllUsers);
router.get('/api/admin/doctors', verifyAdmin, handleGetAllDoctors);
router.get('/api/admin/getDoctorProfile', verifyAdmin, handleGetDoctorProfile);

router.post('/api/admin/deleteDoctor', verifyAdmin, handleDeleteDoctor);
router.post('/api/admin/deleteUser', verifyAdmin, handleDeleteUser);

module.exports = router;