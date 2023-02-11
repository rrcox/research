const express = require('express');
const router = express.Router();
const sources = require('../controllers/sources');
const { sourceValidation } = require('../validation.js');

router.get('/', sources.getAll);
router.post('/', sourceValidation, sources.createSource);
router.put('/:id', sources.updateSource);
router.delete('/:id', sources.deleteSource);

module.exports = router;