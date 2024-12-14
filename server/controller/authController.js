import jwt from 'jsonwebtoken';
import authSchema from '../models/authModel.js';
import { loadUserCollection } from '../config/db.js'
import validationMessage from '../utils/validationError.js';

// Generate access token
const generateAccessToken = (uuid) => {
  return jwt.sign({ uuid }, 'appTokenKey', { expiresIn: '12h' });
};

// Login user
export const login = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const { userName, password } = req.body;

    const field = { userName, password }
    const context = { usersCollection, userName }
    const errors = await validationMessage(field, authSchema, context)
    if (errors) {
      return res.status(400).json({
        data: errors,
        metadata: {
          message: 'Authentication failed. Please check your credentials.'
        }
      })
    }

    const user = usersCollection.data.users.find(user => user.userName === userName);
    const accessToken = generateAccessToken(user.uuid);
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
