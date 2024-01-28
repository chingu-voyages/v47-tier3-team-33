// import { Request, Response } from 'express';
// import UserModel from '../models/User';

// export const createUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = new UserModel(req.body);
//     const savedUser = await user.save();
//     res.json(savedUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getUserById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await UserModel.findById(req.params.id);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const { Request, Response } = require('express');
const UserModel = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};