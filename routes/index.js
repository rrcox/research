const express = require('express');

const router = express.Router();

router.use('/sources', require('./sources'))

module.exports = router;