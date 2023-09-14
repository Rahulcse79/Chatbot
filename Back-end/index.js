const express = require('express');
const uuid = require('uuid');

const app = express();
app.use(express.json());

const users = {
    "123456789": { "password": "secretpassword" }
};
const tokens = {};

app.post('/authenticate', (req, res) => {
    const { universityID, password } = req.body;

    if (users[universityID] && users[universityID].password === password) {
        const token = uuid.v4();
        tokens[token] = universityID;
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

function authenticateToken(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1];
    if (token == null || !tokens[token]) {
        return res.sendStatus(401);
    }
    req.universityID = tokens[token];
    next();
}

app.get('/resource', authenticateToken, (req, res) => {
    const universityID = req.universityID;
    res.json({ message: `Access granted for user ${universityID}! This is your protected resource.` });
});


app.listen(4000)
