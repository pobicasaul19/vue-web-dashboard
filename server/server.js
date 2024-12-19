import 'dotenv/config'
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { corsOptions } from './config/corsOptions.js';
import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';
import swaggerInfo from './swagger.js';
import authMiddleware from './middleware/authMiddleware.js';
import { credentials } from './middleware/credentials.js';
import { logger } from './utils/index.js';
import { fileURLToPath } from 'url';

const app = express();

// Middelwares
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Swagger UI
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerInfo));


// Routes
import login from './routes/api/auth/index.js'
import getUsers from './routes/api/users/index.js';
import createUser from './routes/api/users/create.js';
import updateUser from './routes/api/users/update.js';
import getCompanies from './routes/api/company/index.js';
import createCompany from './routes/api/company/create.js';
import updateCompany from './routes/api/company/update.js';
import getArticles from './routes/api/articles/index.js';
import createArticle from './routes/api/articles/create.js';
import updateArticle from './routes/api/articles/update.js';


app.use('/api/auth/login', login);
const dir = path.dirname(fileURLToPath(import.meta.url))
app.use('/assets', express.static(path.join(dir, 'assets')));

authMiddleware(app);
// Users endpoint
app.use('/api/users', getUsers);
app.use('/api/users', createUser);
app.use('/api/users', updateUser);

// Company endpoint
app.use('/api/companies', getCompanies);
app.use('/api/companies', createCompany);
app.use('/api/companies', updateCompany);

// Article endpoint
app.use('/api/articles', getArticles);
app.use('/api/articles', createArticle);
app.use('/api/articles', updateArticle);

// Start the server
const port = 5000;
app.listen(port, async () => {
  logger.info(`Server running on  http://localhost:${port}`)
  logger.info(`Swagger running on http://localhost:${port}/documentation`)
});
