import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user: IUser | null = await UserModel.findOne({ email });

		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		const token = jwt.sign({ userId: user._id }, 'your_secret_key', {
			expiresIn: '1h',
		});

		res.json({ token });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
