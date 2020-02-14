const mySQL = require('mysql');
const mySQLConn = mySQL.createConnection({
                    host:'da-stage-mysql.c75dxaihjtem.us-west-2.rds.amazonaws.com',
                    user:'olyprouser',
                    password:'Password@123',
                    database:'olypro'
                  });
  
  mySQLConn.connect((err) => {
    if(!err) return console.log('connected');
    return console.log(err);
  });

  module.exports = { mySQLConn };