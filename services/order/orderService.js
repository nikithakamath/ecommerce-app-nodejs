'use strict';

const orderModel = require('../../models/order/order');
const inventoryModel = require('../../models/inventory/inventory');

/**
 * @class OrderService
 */
class OrderService {
    /**
     * 
     * @param {Object} orderData
     * @returns {Promise} 
     */
    createOrder(orderData) {
        return new Promise((resolve, reject) => {
            // Check the item stock availability in the inventory
            inventoryModel.checkInventory(orderData.item_id, orderData.quantity)
                .then((connection) => {
                    orderData.total_price = orderData.price * orderData.quantity;
                    orderData.order_date = new Date();
                    // Calls create order
                    return orderModel.createOrder(orderData, connection);
                })
                .then((orderID) => {
                    resolve(orderID);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

let orderServiceObj = new OrderService();

module.exports = orderServiceObj;