// models/userModel.js (User Model)
const db = require('../database/database.js');

const UserModel = {
    getAllUsers: async () => {
        const sql = 'SELECT * FROM attendence_mgmt_db.users';
        return db.executeQuery(sql);
    },

    getUserById: async (id) => {
        const sql = 'SELECT * FROM Users WHERE id = ?';
        return db.executeQuery(sql, [id]);
    },

    createUser: async (user) => {
        const sql = 'INSERT INTO attendence_mgmt_db.Users (name, email) VALUES (?, ?)';
        return db.executeQuery(sql, [user.name, user.email]);
    },

    updateUser: async (id, user) => {
        const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
        return db.executeQuery(sql, [user.name, user.email, id]);
    },

    deleteUser: async (id) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        return db.executeQuery(sql, [id]);
    },
};

module.exports = UserModel;