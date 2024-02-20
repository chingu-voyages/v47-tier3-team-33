import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

module.exports.authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.log('**************', req.headers);
	// ! req.cookies.userToken
	jwt.verify(req.cookies.userToken, SECRET, (err: any, payload: any) => {
		if (err) {
			// res.status(401).json({verified: false})
			console.log('BROKEN');
		} else {
			console.log('Authenticated');
			// req.user = payload
			// console.log(payload);
			next();
		}
	});
};
