'use strict';

const mysql = require('mysql');

class Connection {
    constructor() {
        this.dbConnection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
        });
        this.dbConnection.connect((err) => {
            if(err) {
                console.log(`Error while connecting to MySQL: ${err}`);
            } else {
                console.log(`Connection to MySQL is successful`);
            }
        });
    }
}

let connObj = new Connection();

module.exports.connection = connObj.dbConnection;
