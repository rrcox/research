const client = require('../model/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res, next) => {
    const db = await client.getDb().db('research');
    const collection = db.collection('sources')
    const cursor = collection.find();
    const documents = await cursor.toArray();
    
    res.status(200).json(documents);
};

const createSource = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const source = {
        title: req.body.title,
        publish_date: req.body.publish_date,
        doi: req.body.doi,
        abstract: req.body.abstract,
        apa_citation: req.body.apa_citation,
        apa_reference: req.body.apa_reference,
        apa_summary: req.body.apa_summary
    }
    const db = await client.getDb().db('research');
    const collection = db.collection('sources');
    const response = await collection.insertOne(source);
    
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error);
    }
}
    
const updateSource = async (req, res) => {
    const userId = new ObjectId(req.params.id);  
    const source = {
        title: req.body.title
    };

    const db = await client.getDb().db('research');
    const collection = db.collection('sources');
    const response = await collection.replaceOne({ _id: userId }, source);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error);
    }
};

const deleteSource = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const db = await client.getDb().db('research');
    const collection = db.collection('sources');
    const response = await collection.remove({ _id: userId }, true);

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error);
    }
};

module.exports = { getAll, createSource, updateSource, deleteSource };