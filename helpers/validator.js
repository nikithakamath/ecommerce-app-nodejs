'use strict';

const {check} = require('express-validator');

module.exports = {
    createOrderValidation: [
        check('user_id').not().isEmpty().isInt(),
        check('item_id').not().isEmpty().isInt(),
        check('quantity').not().isEmpty().isInt(),
        check('price').not().isEmpty().isInt()
    ]
  };