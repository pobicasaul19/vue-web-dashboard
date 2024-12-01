const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loadUserCollection } = require('../config/db');

// Generate access token
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, 'archTestKey', { expiresIn: '12h' });
};

// Login user
const login = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const { userName, password } = req.body;

    // Validate input
    if (!userName || !password) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }
    // Find user by userName
    // const user = await usersCollection.findOne({ userName });
    const user = usersCollection.data.users.find(user => user)
    const userExist = user.userName === userName
    if (!userExist) {
      return res.status(404).json({ message: 'User does not exist.' });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    // Generate token
    const accessToken = generateAccessToken(user._id);
    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      data: { user: userWithoutPassword, token: accessToken },
      metadata: { message: 'Authorized' },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { login };
