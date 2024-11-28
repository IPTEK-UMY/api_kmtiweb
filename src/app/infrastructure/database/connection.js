const mysql = require('mysql')
require('dotenv').config()

const db= mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASS,
    database : process.env.DB
})

db.connect((err) => {
    if(err) {
        console.log('Failed Connection')
    } else {
        console.log('Connect to Database')
    }
})
module.exports = db