const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllPlayers = (req, res) => {
    pool.query("SELECT * FROM players", (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json(rows);
    })
}

const getPlayerById = (req, res) => {
    let sql = "SELECT * FROM players WHERE id = ?"
    sql = mysql.format(sql, [ req.params.id ])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json(rows);
    })
}

const createPlayer = (req,res) => {
    // const { username } = req.body.username;
    let sql = "INSERT INTO players (username) WHERE username = ?"
    sql = mysql.format(sql, [req.body.username]);

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json({ newId: results.insertId });
    })
}

const deletePlayerByUsername = (req, res) => {
    let sql = "DELETE FROM players WHERE username = ?"
    sql = mysql.format(sql, [ req.params.username ])

    pool.query(sql, (err, results) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
    })
}
module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    // updateUserById,
    deletePlayerByUsername
}