const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contacts');

router.get('/', contacts.getAll);
router.get('/:id', contacts.getOne);
router.post('/', contacts.createContact);
router.put('/:id', contacts.updateContact);
router.delete('/:id', contacts.deleteContact);

module.exports = router;