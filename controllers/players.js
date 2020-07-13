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

const getPlayerByUsername = (req, res) => {
    let sql = "SELECT * FROM players WHERE username = ?"
    sql = mysql.format(sql, [ req.body.username ])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json(rows);
    })
}

const getGameByUsername = (req, res) => {
    let username = req.body.username;
    let sql = "SELECT * FROM games WHERE player1_id = ? OR player2_id = ?"
    sql = mysql.format(sql, [ username, username ])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json(rows);
    })
}

const createGame = (req,res) => {
    let { player1_id, player2_id, score1, score2 } = req.body;
    let sql = "INSERT INTO games (player1_id, player2_id, score1, score2) VALUE  (?, ?, ?, ?)"
    sql = mysql.format(sql, [ player1_id, player2_id, score1, score2 ]);

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: `Created game number: ${rows.insertId}` });
    })
}

const createPlayer = (req,res) => {
    let sql = "INSERT INTO players (username) VALUE (?)"
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
    getPlayerByUsername,
    getGameByUsername,
    createGame,
    createPlayer,
    // updateUserById,
    deletePlayerByUsername
}