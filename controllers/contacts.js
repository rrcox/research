const client = require('../model/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const db = await client.getDb().db('cse341');
    const collection = db.collection('contacts')
    const cursor = collection.find();
    const documents = await cursor.toArray();
    
    res.status(200).json(documents);
};

const getOne = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    
    const db = await client.getDb().db('cse341');
    const collection = db.collection('contacts');
    const cursor = collection.find({ _id: userId });
    const document = await cursor.toArray(); 
    
    res.status(200).json(document);
};

const createContact = async(req, res, next) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    const db = await client.getDb().db('cse341');
    const collection = db.collection('contacts');
    const response = await collection.insertOne(contact);
    
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error);
    }
}

const updateContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);  
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const db = await client.getDb().db('cse341');
    const collection = db.collection('contacts');
    const response = await collection.replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error);
    }
};

const deleteContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const db = await client.getDb().db('cse341');
    const collection = db.collection('contacts');
    const response = await collection.remove({ _id: userId }, true);

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error);
    }
};

module.exports = { getAll, getOne, createContact, updateContact, deleteContact };