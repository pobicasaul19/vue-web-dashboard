import jwt from 'jsonwebtoken';
import authSchema from '../models/authModel.js';
import { loadUserCollection } from '../config/db.js';
import validationMessage from '../utils/validationError.js';
import 'dotenv/config';
import { logger } from '../utils/index.js';
import { mergeRequestData } from '../utils/mergeRequestData.js';

// Generate access token
const generateAccessToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.APP_TOKEN_KEY, { expiresIn: '7d' });
};

// Login user
export const login = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const { email, password } = mergeRequestData(req);

    logger.info('Login request received', { body: req.body, query: req.query });

    const field = { email, password };
    const context = { usersCollection, email };
    const errors = await validationMessage(field, authSchema, context);
    if (errors) {
      logger.warn('Validation errors', { errors });
      return res.status(400).json({
        data: errors,
        metadata: {
          message: 'Authentication failed. Please check your credentials.'
        }
      });
    }

    const user = usersCollection.data.users.find(user => user.email === email);
    if (!user) {
      logger.warn('User not found', { email });
      return res.status(404).json({
        metadata: {
          message: 'User not found'
        }
      });
    }

    const accessToken = generateAccessToken(user.uuid);
    const { password: _, ...userWithoutPassword } = user;
    logger.info('User authenticated successfully', { user: userWithoutPassword });

    res.status(200).json({
      data: { user: userWithoutPassword, token: accessToken },
      metadata: { message: 'Authorized' },
    });
  } catch (error) {
    logger.error('Login error', { error });
    res.status(500).json({ message: 'Server error' });
  }
};
