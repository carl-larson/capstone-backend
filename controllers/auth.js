// const cookieParser = require('cookie-parser')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// for bcrypt
const saltRounds = 10
const jwtExpirySeconds = 1200

const createPlayer = (req, res) => {
    let sql = "INSERT INTO players (username) VALUE (?)"
    sql = mysql.format(sql, [req.body.username]);

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        
    })
}

const signup = (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    let sql = "INSERT INTO playersCredentials (username, password) VALUES (?, ?)";

    bcrypt.hash(password, saltRounds, function(err, hash) {
        sql = mysql.format(sql, [ username, hash ]);
        
        pool.query(sql, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY')
                return res.status(409).send('Username is taken')
                // return handleSQLError(res, err)
            }
            createPlayer(req, res);
            console.log("sign up successful")
            res.redirect('/')
            res.end()
        })
    })
    
}

const login = (req, res) => {
    const { username, password } = req.body
    const user = {
        username: username,
        password: password
    }
    // console.log(user);
    let sql = "SELECT * FROM playersCredentials WHERE username = ?"
    sql = mysql.format(sql, [ username ])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        if (!rows.length) return res.status(404).send('No matching users')

        const hash = rows[0].password
        bcrypt.compare(password, hash)
            // .catch(err => {
            //     res.sendStatus(err)
            // })
            .then(result => {
                if (!result) return res.status(400).send('Invalid password')

                const data = { ...rows[0] }
                data.password = 'REDACTED'

                let token = jwt.sign(data, 'secret', { expiresIn: jwtExpirySeconds })
                
            //maxAge is in milliseconds
                res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
                res.cookie("username", username, { maxAge: jwtExpirySeconds * 1000 })
                // res.json({
                //     msg: 'Login successful',
                //     token
                // })
                setTimeout(() => {
                    res.redirect('/playerpage')
                }, 500)
                
                // res.end()
            })
    })
}

// const logout = (req, res) => {
//     res.cookie("token", "", { maxAge: -1 });
//     res.cookie("username", "");
//     console.log('Successful logout');
//     res.redirect('/');
//     res.end();
// }

//   axios(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json'
//     },
//     data: {
//       grant_type: 'client_credentials',
//       name: username,
//       password: password,
//       audience: process.env.AUTH0_IDENTITY,
//       connection: 'Username-Password-Authentication',
//       scope: 'openid',
//       client_id: process.env.AUTH0_CLIENT_ID,
//       client_secret: process.env.AUTH0_CLIENT_SECRET
//     }
//   })
//   .then(response => {
//     const { access_token } = response.data
//     res.json({
//       access_token
//     })
//   })
//   .catch(e => {
//     res.send(e)
//   })

module.exports = {
  signup,
  login
//   logout
}