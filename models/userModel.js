// models/userModel.js (User Model)
const db = require('../database/database.js');
const bcrypt = require('bcrypt'); // For password hashing

const UserModel = {
    getAllUsers: async () => {
        const sql = 'SELECT * FROM users';
        return db.executeQuery(sql);
    },

    getUserById: async (id) => {
        const sql = 'SELECT * FROM Users WHERE users.id = ?';
        return db.executeQuery(sql, [id]);
    },


    updateUser: async (id, user) => {
        const sql = 'UPDATE users SET name = ?, email = ? WHERE users.id = ?';
        return db.executeQuery(sql, [users.name, user.email, id]);
    },

    deleteUser: async (id) => {
        const sql = 'DELETE FROM users WHERE users.id = ?';
        return db.executeQuery(sql, [id]);
    },
    createUser: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        // this will be given from frontend to you
        return db.executeQuery(sql, [user.name, user.email, hashedPassword]);
    },
    getUserByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        return db.executeQuery(sql, [email]);
    },
};

module.exports = UserModel;