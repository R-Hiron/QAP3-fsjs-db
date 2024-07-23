const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      res.json(users);
    } else {
      res.render('index', { users });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      throw new Error('Name and email are required');
    }
    await User.create({ name, email });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
      throw new Error('Name and email are required');
    }
    await User.update(id, { name, email });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.partialUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = {};

    if (name) user.name = name;
    if (email) user.email = email;

    if (Object.keys(user).length === 0) {
      throw new Error('No valid fields to update');
    }

    await User.partialUpdate(id, user);
    res.status(200).json({ message: 'User partially updated successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteById(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
