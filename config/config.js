const mysql = require('mysql');
const datos = require('./configdb');
const db = mysql.createConnection({
    host:   datos.DB_HOST,
    user: datos.DB_USER,
    password: datos.DB_PASSWORD,
    database: datos.DB_NAME,
    port:  datos.DB_PORT
})

db.connect(function(err){
    if(err)
    throw err;
    console.log('base conectada');
} );
const PORT = 3000;
module.exports = PORT;
module.exports = db;