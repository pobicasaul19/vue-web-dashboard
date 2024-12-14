// const swaggerJSDoc = require('swagger-jsdoc');
// const { version } = require('./package.json')
import swaggerJSDoc from 'swagger-jsdoc';
import packageJson from './package.json' with { type: 'json' }

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Writer/Editor Dashboard Site API Documentation',
      version: packageJson.version,
      description: 'Automatically generated API documentation.',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your token in the format: Bearer <token>',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerInfo = swaggerJSDoc(swaggerOptions);

export default swaggerInfo
