'use strict';

const connection = require('../connection').connection;
const {inventory_table} = require('../../helpers/constants');

/**
 * @class InventoryModel
 */
class InventoryModel {
    /**
     * 
     * @param {Number} itemID 
     * @param {Number} quantity 
     * @returns {Promise}
     */
     /* This method does the following in a transaction :
        1. Read the item inventory
        2. Calculate remaining stock based on the quantity requested
        3. If remaining stock goes below zero, then return error
        4. Else, update the remaining stock and return the connection object
      */
    checkInventory(itemID, quantity) {
        return new Promise((resolve, reject) => {
            let readQuery = `select * from ${inventory_table} where item_id=?`;
            let updateQuery = `update ${inventory_table} set stock=? where item_id=?`
            connection.beginTransaction((err) => {
                if(err) reject(err);
                connection.query(readQuery, itemID, function (error, results) {
                    if(error) {
                        return connection.rollback(() => {
                          reject(error);
                        });
                    }
                    let remainingStock = results[0].stock - quantity;
                    if(remainingStock<0) {
                        // No stock available
                        return connection.rollback(() => {
                            reject(new Error('Item stock not available'));
                        });
                    }
                    connection.query(updateQuery, [remainingStock, itemID], (error, results) => {
                        if(error) {
                            return connection.rollback(() => {
                                reject(error);
                            });
                        }
                        resolve(connection);
                    });
                });
            });    
        });
    }
}

let inventoryModelObj = new InventoryModel();

module.exports = inventoryModelObj;