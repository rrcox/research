const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv');
const db = require('./model/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerAutogen = require('swagger-autogen')();

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app
    .use(express.json())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(cors())
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
    .use((err, req, res, next) => {
        console.log(err);
        // err.statusCode = err.statusCode || 500;
        // err.message = err.message || "Internal Server Error";
        // res.status(err.statusCode).json({
        //   message: err.message,
        // });
    });    


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

