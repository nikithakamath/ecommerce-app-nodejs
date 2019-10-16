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
    /* Assumptions :
        1. Create order can include only one item with specified quantity
        2. User is already created and has a token. Token must be created using
        let token = jwt.sign({
            user_id: user_id,
            iat: Math.floor(Date.now() / 1000)
          }, process.env.JWT_SECRET);
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