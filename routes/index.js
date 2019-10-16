'use strict';

const express = require('express');
const router = express.Router();

router.use('/order', require('../controllers/order/orderController').router);

module.exports = router;