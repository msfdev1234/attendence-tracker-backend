// controllers/courseController.js
const CourseModel = require('../models/courseModel');

const CourseController = {
    getCourses: async (req, res) => {
        try {
            const courses = await CourseModel.getCourses();
            res.json(courses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch courses' });
        }
    },

    getCourseById: async (req, res) => {
        try {
            const course = await CourseModel.getCourseById(req.params.courseId);
            if (!course.length) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.json(course[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch course' });
        }
    },

    getStudentsInCourse: async (req, res) => {
        try {
            const students = await CourseModel.getStudentsInCourse(
                req.params.courseId
            );
            res.json(students);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch students' });
        }
    },
    createCourse: async (req, res) => {
        try {
            const newCourse = await CourseModel.createCourse(req.body);
            res.status(201).json({
                message: 'Course created successfully',
                courseId: newCourse.insertId,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create course' });
        }
    },

    // ... other course-related controller methods
};

module.exports = CourseController;