"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;
module.exports.authenticate = (req, res, next) => {
    // console.log('**************', req.headers);
    // ! req.cookies.userToken
    jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
        if (err) {
            // res.status(401).json({verified: false})
            console.log('BROKEN');
        }
        else {
            console.log('Authenticated');
            // req.user = payload
            // console.log(payload);
            next();
        }
    });
};
