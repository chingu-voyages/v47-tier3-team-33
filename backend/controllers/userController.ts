import { Request, Response } from 'express';

import UserModel, { IUser } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
	try {
		const savedUser = await UserModel.create(req.body);

		res.status(201).json(savedUser);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message || 'Internal Server Error' });
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(user);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message || 'Internal Server Error' });
	}
};
