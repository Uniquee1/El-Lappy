const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Add your MySQL root password
    database: 'ecommerce'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.json({ success: true, message: 'Login successful!' });
        } else {
            res.json({ success: false, message: 'Invalid username or password.' });
        }
    });
});

// Add new user endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.json({ success: false, message: 'Username already exists.' });
            } else {
                throw err;
            }
        } else {
            res.json({ success: true, message: 'User registered successfully!' });
        }
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
