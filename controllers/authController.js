// controllers/authController.js (Authentication Controller)
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const AuthController = {
    register: async (req, res) => {
        try {
            const user = await UserModel.createUser(req.body);
            res.status(201).json({ message: 'User registered', insertId: user.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const user = await UserModel.getUserByEmail(req.body.email);
            if (!user.length) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user[0].password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = AuthController;