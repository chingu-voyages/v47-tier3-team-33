import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
	try {
		const savedUser = await UserModel.create(req.body);

		res.status(201).json(savedUser);
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: error.message || 'Error registering user.' });
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
		console.error(error);
		res
			.status(500)
			.json({ error: error.message || 'Error finding user via getUserById.' });
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const users = await UserModel.find();
		res.json(users);
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: 'Error finding user via getUser.' });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user: IUser | null = await UserModel.findOne({ email });

		if (!user) {
			return res.status(401).json({ error: "User doesn't exist!" });
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return res.status(401).json({ error: 'Incorrect password' });
		}

		const token = jwt.sign({ userId: user._id }, 'your_secret_key', {
			expiresIn: '1h',
		});

		res.json({ token, user });
	} catch (error: any) {
		if (error) {
			res.status(401).json({ error: 'Incorrect email and/or password!' });
		}
		console.log(error);

		res.status(500).json({ error: 'Error logging in user.' });
	}
};

export const logoutUser = (req: Request, res: Response) => {
	// Since JWT is stateless, the client-side is usually responsible for logging out

	console.log(`User logged out: ${req.user.email}`);

	try {
		res.status(200).json({ message: 'Logout successful' });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: 'Error logging out user' });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deletedUser = await UserModel.findByIdAndDelete(id);
		if (!deletedUser) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: 'Error deleting user' });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedUser) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(200).json({ message: 'User updated successfully' });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: 'Error updating user' });
	}
};

// Route handling the file upload and user update
export const updateUserWithFile = async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const profileImgPath = req.file ? req.file.path : undefined;

	try {
		const updatedUser = await UserModel.findByIdAndUpdate(
			userId,
			{
				profile_img: profileImgPath,
			},
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json(updatedUser);
	} catch (error) {
		console.error('Error updating user:', error);
		res.status(500).json({ error: 'Error updating user' });
	}
};
