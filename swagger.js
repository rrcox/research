const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Research API',
    description: 'Allows access to manage the research documents in the MongoDB database.',
  },
  host: 'cse341-rrcox-research.onrender.com',
  schemes: ['http','https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);