// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

//get all courses
router.get('/', authenticateToken, CourseController.getCourses);
//get course by id
router.get('/:courseId', authenticateToken, CourseController.getCourseById);
//get students in a course
router.get('/:courseId/students', authenticateToken, CourseController.getStudentsInCourse);
//create a new course
router.post('/', authenticateToken, authorizeRole(['Professor']), CourseController.createCourse);

module.exports = router;