const UserModel = require('../models/userModel');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await UserModel.getUserById(req.params.id);
            if (!user.length) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const result = await UserModel.createUser(req.body);
            res.status(201).json({ message: 'User created', insertId: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const result = await UserModel.updateUser(req.params.id, req.body);
            res.json({ message: 'User updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const result = await UserModel.deleteUser(req.params.id);
            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = UserController;