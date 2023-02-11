const express = require('express');
const router = express.Router();
const sources = require('../controllers/sources');
const { body } = require('express-validator');

router.get('/', sources.getAll);
// router.post('/', body('title').isLength({ max:10 }), sources.createSource);
router.post('/', sources.createSource);
router.put('/:id', sources.updateSource);
router.delete('/:id', sources.deleteSource);

module.exports = router;