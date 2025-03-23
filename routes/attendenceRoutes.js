// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/attendenceController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Mark attendance
router.post('/', authenticateToken, authorizeRole(['Professor']), AttendanceController.markAttendance);
// Get attendance for a specific student in a course
router.get('/student/:studentId/course/:courseId', authenticateToken, AttendanceController.getAttendanceForStudent);
// Get attendance for a course on a specific date
router.get('/course/:courseId', authenticateToken, authorizeRole(['Professor']), AttendanceController.getAttendanceForCourse);

// Get attendance report for a course within a date range
router.get('/report/:courseId', authenticateToken, authorizeRole(['Professor']), AttendanceController.getAttendanceReport);



module.exports = router;