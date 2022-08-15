
const mysql = require('mysql')

// create connection object connect mysql, here can change host
// because the table I add manually, I haven't write create mysql table code,
// if we need, I can try to add
let connection
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'datatest'
})

if (!connection){
    connection = ""
}

// close mysql connect
// connection.end()
module.exports = connection