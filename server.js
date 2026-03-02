const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ⭐ IMPORTANT
app.use(express.static(path.join(__dirname )));

// ===== DATABASE CONNECTION =====
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pavithra@123",
    database: "cew_db"
});


// ===== START SERVER =====
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000 🚀");
}); 


// Login
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {

        if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }

    });
});


// Register
app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], (err, result) => {

        if (result.length > 0) {
            return res.json({ success: false });
        }

        const insertSql =
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(insertSql, [name, email, password], (err, result) => {

            if (err) {
                console.log(err);
                return res.json({ success: false });
            }

            res.json({ success: true });

        });

    });

});


// ===== ROUTES =====

// Add Idea
app.post("/addIdea", (req, res) => {

    const { idea } = req.body;

    const sql = "INSERT INTO ideas (idea_text) VALUES (?)";

    db.query(sql, [idea], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error");
        }

        res.send("Idea Added");

    });

});

// Get Ideas
app.get("/ideas", (req, res) => {

    const sql = "SELECT * FROM ideas ORDER BY created_at DESC";

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// Events
app.get("/events", (req, res) => {

    const sql = `
        SELECT * FROM events
        WHERE event_date >= CURDATE()
        ORDER BY event_date ASC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// ===== ADD FORUM POST =====
app.post("/addForum", (req, res) => {

    const { postText } = req.body;

    const sql = "INSERT INTO technical_forum (post_text) VALUES (?)";

    db.query(sql, [postText], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.send("Forum Added");
        }

    });

});


// ===== FETCH FORUM POSTS =====
app.get("/fetchForum", (req, res) => {

    const sql = "SELECT * FROM technical_forum ORDER BY created_at DESC";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }

    });

});

//job referrals
app.post("/submitReferral", (req, res) => {

    const { yourName, yourEmail, friendName, friendEmail, jobTitle, resumeLink } = req.body;

    const sql = `
        INSERT INTO referrals
        (your_name, your_email, friend_name, friend_email, job_title, resume_link)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql,
        [yourName, yourEmail, friendName, friendEmail, jobTitle, resumeLink],
        (err, result) => {

            if (err) {
                console.log(err);   // ⭐ IMPORTANT — check terminal
                return res.json({ success: false });
            }

            res.json({ success: true });

        });

});

// Add Birthday
app.get("/birthdays", (req, res) => {

    const sql = "SELECT name, birthdate FROM birthdays ORDER BY birthdate ASC";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }

    });

});

// Get Birthdays
app.get("/birthdays", (req, res) => {

    const sql = "SELECT * FROM birthdays ORDER BY birthdate ASC";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }

    });

});