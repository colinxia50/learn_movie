var mysql = require('mysql'),
    setting = require('./setting');
var connection = mysql.createConnection({
    host : setting.host,
    port : setting.port,
    database : setting.db_name,
    user : setting.username,
    password : setting.password
});
connection.connect();
module.exports = connection;