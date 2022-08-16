let mysql = require('mysql2'),
    config = require('./dbConfig'),
    {Client} = require('ssh2')

let connection = module.exports = function(){}

createDBConnection = function(){
    let mysqlConnection = mysql.createConnection({
        host:config.mySQLConfig.host,
        user:config.mySQLConfig.username,
        password:config.mySQLConfig.password,
        database:config.mySQLConfig.database,
        connectTimeout:config.mySQLConfig.timeout,
    })

    return mysqlConnection
}

connection.invokeQuery = function(sqlQuery, data){
    const ssh = new Client()
    ssh.connect(config.sshTunnelConfig)
    ssh.on('ready',function(){
        ssh.forwardOut(
            config.localhost,
            config.mySQLConfig.timeout,
            config.localhost,
            config.mySQLConfig.port,
            function(err,stream){
                if(err) handleSSHError(err)

                config.mySQLConfig.stream = stream
                let db = mysql.createConnection(config.mySQLConfig)

                db.query(sqlQuery, function(err, rows){
                    if(rows){
                        // console.log(rows)
                        data(rows)

                    }
                    if(err){
                        handleMySQLError(err)
                    }
                })
            }
        )
    })
}