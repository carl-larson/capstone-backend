const mysql = require('mysql')
require ('dotenv').config();

class Connection {
    constructor() {
    if (!this.pool) {
        console.log('creating mysql connection...')

        const config = {
        connectionLimit: 100,
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'farkle'
        }

        if (process.env.NODE_ENV === 'production' && process.env.CLOUD_INSTANCE) {
        console.log(`connect socket: ${process.env.CLOUD_INSTANCE}`)
        config.socketPath = `/cloudsql/${process.env.CLOUD_INSTANCE}`
        }

        this.pool = mysql.createPool(config)

        return this.pool
    }

    return this.pool
    }
}

const instance = new Connection()

module.exports = instance;