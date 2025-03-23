// models/attendanceModel.js
const db = require('../database/database.js');
const AttendanceModel = {
    markAttendance: async (attendanceData) => {
        const sql = `
      INSERT INTO attendance (student_id, course_id, date, status, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
        return db.executeQuery(sql, [
            attendanceData.student_id,
            attendanceData.course_id,
            attendanceData.date,
            attendanceData.status,
            attendanceData.latitude,
            attendanceData.longitude,
        ]);
    },

    getAttendanceForStudent: async (studentId, courseId) => {
        const sql = `
      SELECT * FROM attendance
      WHERE student_id = ? AND course_id = ?
    `;
        return db.executeQuery(sql, [studentId, courseId]);
    },

    getAttendanceForCourse: async (courseId, date) => {
        const sql = `SELECT u.id, u.name, a.status, a.latitude, a.longitude
                            FROM users u
      LEFT JOIN attendance a ON u.id = a.student_id AND a.course_id = ? AND a.date = ?
      JOIN student_courses sc ON u.id = sc.student_id
      WHERE sc.course_id = ? AND u.role = 'Student'
    `;
        return db.executeQuery(sql, [courseId, date, courseId]);
    },
    // ... other attendance-related database operations
    getAttendanceReport: async (courseId, startDate, endDate) => {
        //SQL query to get attendance records within a date range for a specific course
        const sql = `
          SELECT
            u.id as student_id,
            u.name as student_name,
            u.email as student_email,
            a.date,
            a.status
          FROM
            users u
            LEFT JOIN attendance a ON u.id = a.student_id
          WHERE
            a.course_id = ?
            AND a.date >= ?
            AND a.date <= ?
            AND u.role = 'Student'
          ORDER BY
            u.name,
            a.date
        `;
        return db.executeQuery(sql, [courseId, startDate, endDate]);
    }
};

module.exports = AttendanceModel;
