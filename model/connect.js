const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

let _db;

async function connect() {
    dotenv.config();
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fnbzrec.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        _db = client;
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
    // finally {
    //     await client.close();
    // }
}


function getDb () {
    return _db;
}

module.exports = { connect, getDb };
