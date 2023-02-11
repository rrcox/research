// const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv');
const db = require('./model/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const swaggerAutogen = require('swagger-autogen')();

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app
    .use(express.json())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type','application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/', require('./routes'))


const start = async () => {
    const connected = await db.connect();    
    app.listen(port, () => {
        if (connected) {
            console.log(`Running on port ${port}`);
        } else {
            console.log(`Error - not connected`);
        }
    })
}
start();

