'use strict';

const {order_table} = require('../../helpers/constants');

/**
 * @class OrderModel
 */
class OrderModel {
    /**
     * 
     * @param {Object} orderDetails 
     * @param {Object} connection 
     * @returns {Promise}
     */
    /* This method takes the order data and the connection object to carry out
        the order creation process in a transaction. The transaction is either
        committed on success or rollbacked on failure
     */
    createOrder(orderDetails, connection) {
        return new Promise((resolve, reject) => {
            let query = `insert into ${order_table} set ?`;
            connection.query(query, orderDetails, function (error, results) {
                if(error) {
                    return connection.rollback(() => {
                        reject(error);
                    });
                } else {
                    connection.commit((error) => {
                        if (error) {
                            return connection.rollback(() => {
                                reject(error);
                            });
                        } else {
                            resolve(results.insertId);
                        }
                    });
                }
            });
        });
    }
}

let orderModelObj = new OrderModel();

module.exports = orderModelObj;