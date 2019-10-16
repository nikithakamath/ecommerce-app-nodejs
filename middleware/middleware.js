'use strict';

const jwt = require('jsonwebtoken');

/**
 * @class Middleware
 */
class Middleware {
    /**
     * 
     * @param {Object} request 
     * @param {Object} response 
     * @param {Object} next 
     */
    authorizeUser(request, response, next) {
        if (request.headers.hasOwnProperty('authorization')) {
            let accessToken = request.headers.authorization.replace('Bearer ', '');
            let userID = request.body.user_id;
            jwt.verify(accessToken, process.env.JWT_SECRET, function(err, decoded) {
                if (!err && userID == decoded.user_id) {
                    // Token verified successfully
                    next();
                } else {
                    response.status(401).json({
                        success: false,
                        data: 'Token authentication failed'
                    });
                }
            });
        } else {
            response.status(401).json({
                success: false,
                data: 'Token is not present in the request'
            });
        }
    }
  }
  
  let middlewareObj = new Middleware();
  
  module.exports = middlewareObj;