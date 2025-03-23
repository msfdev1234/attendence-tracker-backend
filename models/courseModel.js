// models/courseModel.js
const db = require('../database/database.js');

const CourseModel = {
    getCourses: async () => {
        const sql = 'SELECT * FROM courses';
        return db.executeQuery(sql);
    },

    getCourseById: async (courseId) => {
        const sql = 'SELECT * FROM courses WHERE id = ?';
        return db.executeQuery(sql, [courseId]);
    },

    getStudentsInCourse: async (courseId) => {
        const sql = `
      SELECT u.id, u.name, u.email
      FROM users u
      JOIN student_courses sc ON u.id = sc.student_id
      WHERE sc.course_id = ? AND u.role = 'Student'
    `;
        return db.executeQuery(sql, [courseId]);
    },

    createCourse: async (courseData) => {
        const sql =
            'INSERT INTO courses (name, code, professor_id) VALUES (?, ?, ?)';
        return db.executeQuery(sql, [
            courseData.name,
            courseData.code,
            courseData.professor_id,
        ]);
    },

    // ... other course-related database operations
};

module.exports = CourseModel;