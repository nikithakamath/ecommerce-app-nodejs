const express = require('express');
const router = express.Router();

const {validationResult} = require('express-validator');

const orderService = require('../../services/order/orderService');
const validator = require('../../helpers/validator');
const middleware = require('../../middleware/middleware');

/**
 * @class OrderController
 */
class OrderController {
    /**
     * 
     * @param {Object} request 
     * @param {Object} response 
     */
    createOrder(request, response) {
        let validationErr = validationResult(request);
        if (!validationErr.isEmpty()) {
            response.status(400).json({
                success: false,
                data: 'Invalid parameters'
            });
        } else {
            orderService.createOrder(request.body)
                .then((data) => {
                    response.status(201).json({
                        success: true,
                        data: data
                    });
                })
                .catch((error) => {
                    response.status(500).json({
                        success: false,
                        data: error.message
                    });
                });
        }   
    }
}
let orderObj = new OrderController();

router.post('/', validator.createOrderValidation, 
            middleware.authorizeUser, orderObj.createOrder);

module.exports.orderObj = orderObj;
module.exports.router = router;