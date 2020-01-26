const express = require("express");
const path = require("path");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "companyDB"
});

connection.connect(function(err) {
    if (err) {
        console.error("Error Connecting: " + err.stack);
        return;
    }

    console.log("Connected as ID: " + connection.threadId);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => console.log(`Listening on ${port}`));