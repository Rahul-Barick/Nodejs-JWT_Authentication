const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({ "message": "Welcome to the API" });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, "secretKey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({ "message": "POST Created....",authData });
        }
    })
});

app.post('/api/login', (req, res) => {
    //mock user
    let user = {
        id: 1,
        username: "rahul",
        email: "libra2rahul@gmail.com"
    };

    jwt.sign({ user }, 'secretKey', {expiresIn:"30s"},(err, token) => {
        res.json({ token });
    });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

//Format of Token
//Authorization : Bearer <access_token>

//Verify Token

function verifyToken(req, res, next) {
    //Get Auth Header Value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    console.log("check  ===> " + bearerHeader);
    if (typeof (bearerHeader) !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(" ");
        //Get token from Array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //Call the Next Middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
        //Forbidden
        res.sendStatus(403);
    }
}