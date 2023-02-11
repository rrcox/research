const { check } = require('express-validator');
 
exports.sourceValidation = [
    check('title', 'Title has a maximum length of 50').isLength({ max: 10 })
]
