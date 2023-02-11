const express = require('express');
const router = express.Router();
const sources = require('../controllers/sources');

router.get('/', sources.getAll);
router.post('/', sources.createSource);
router.put('/:id', sources.updateSource);
router.delete('/:id', sources.deleteSource);

module.exports = router;