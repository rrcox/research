const { check } = require('express-validator');
 
exports.sourceValidation = [
    check('title', 'Title has a maximum length of 50').isLength({ min: 5, max: 10 })
]
