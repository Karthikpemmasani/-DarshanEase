const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const memoryStore = require('../utils/memoryStore');

// Generate JWT
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'supersecretjwtkey_darshanease';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    let newUser = null;

    if (mongoose.connection.readyState === 1) {
      try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const created = await User.create({
          name,
          email,
          password: hashedPassword,
          phone,
        });

        newUser = {
          _id: created.id,
          name: created.name,
          email: created.email,
          phone: created.phone,
          role: created.role,
        };
      } catch (err) {
        console.log('MongoDB register error, using memoryStore:', err.message);
      }
    }

    if (!newUser) {
      const memExists = memoryStore.findUserByEmail(email);
      if (memExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const createdMem = await memoryStore.createUser({ name, email, password, phone });
      newUser = {
        _id: createdMem._id,
        name: createdMem.name,
        email: createdMem.email,
        phone: createdMem.phone,
        role: createdMem.role,
      };
    }

    res.status(201).json({
      ...newUser,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let foundUser = null;

    // Hardcoded Admin Credential Check for 100% reliability
    if (email.toLowerCase() === 'admin@darshanease.com' && password === 'admin123') {
      foundUser = {
        _id: 'usr_admin_001',
        name: 'System Admin',
        email: 'admin@darshanease.com',
        phone: '9876543210',
        role: 'admin',
      };
    }

    if (mongoose.connection.readyState === 1 && !foundUser) {
      try {
        const dbUser = await User.findOne({ email }).select('+password');
        if (dbUser && (await bcrypt.compare(password, dbUser.password))) {
          foundUser = {
            _id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            phone: dbUser.phone,
            role: dbUser.role,
          };
        }
      } catch (err) {
        console.log('MongoDB login error, using memoryStore:', err.message);
      }
    }

    if (!foundUser) {
      const memUser = memoryStore.findUserByEmail(email);
      if (memUser && (await bcrypt.compare(password, memUser.password))) {
        foundUser = {
          _id: memUser._id,
          name: memUser.name,
          email: memUser.email,
          phone: memUser.phone,
          role: memUser.role,
        };
      }
    }

    if (foundUser) {
      res.json({
        ...foundUser,
        token: generateToken(foundUser._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

// @desc    Get user data
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};

