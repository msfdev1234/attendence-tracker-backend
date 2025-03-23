// controllers/attendanceController.js
const AttendanceModel = require('../models/attendanceModel');

// Function to calculate distance between two coordinates (in meters)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

const AttendanceController = {
    markAttendance: async (req, res) => {
        try {
            const attendanceData = req.body;
            // Professor's location (assuming it's passed in the request)
            const professorLat = req.body.professorLatitude;
            const professorLon = req.body.professorLongitude;

            // Fetch student location (You might need to store student locations upon login)
            // For this example, let's assume student's location is also passed in the request
            const studentLat = req.body.studentLatitude;
            const studentLon = req.body.studentLongitude;

            // Calculate distance
            const distance = calculateDistance(
                professorLat,
                professorLon,
                studentLat,
                studentLon
            );

            // Check proximity (within 10 meters)
            if (distance > 10) {
                return res
                    .status(400)
                    .json({ error: 'Student is not within the allowed radius' });
            }

            await AttendanceModel.markAttendance(attendanceData);
            res.status(201).json({ message: 'Attendance marked successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to mark attendance' });
        }
    },

    getAttendanceForStudent: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const courseId = req.params.courseId;
            const attendanceRecords = await AttendanceModel.getAttendanceForStudent(
                studentId,
                courseId
            );
            res.json(attendanceRecords);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch attendance records' });
        }
    },

    getAttendanceForCourse: async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const date = req.query.date; // Assuming date is passed as a query parameter
            const attendanceRecords = await AttendanceModel.getAttendanceForCourse(
                courseId,
                date
            );
            res.json(attendanceRecords);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch attendance records' });
        }
    },
    getAttendanceReport: async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;

            // Validate date inputs (optional, but recommended)
            if (!startDate || !endDate) {
                return res.status(400).json({ error: "Start date and end date are required." });
            }

            const report = await AttendanceModel.getAttendanceReport(courseId, startDate, endDate);
            res.json(report);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to generate attendance report." });
        }
    },
};

module.exports = AttendanceController;