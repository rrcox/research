const express = require('express');
const router = express.Router();
const sources = require('../controllers/sources');

router.get('/', sources.getAll);
// router.get('/:id', contacts.getOne);
router.post('/', sources.createSource);
// router.put('/:id', contacts.updateContact);
// router.delete('/:id', contacts.deleteContact);

module.exports = router;