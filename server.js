const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => console.log(`Listening on ${port}`));