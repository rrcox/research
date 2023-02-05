const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Contacts API',
    description: 'Allows access to manage the contacts documents in the MogoDB database.',
  },
  host: 'rrcox-cse341.onrender.com',
  schemes: ['http','https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);