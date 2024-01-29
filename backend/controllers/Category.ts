import { Request, Response } from 'express';
import { CategoryModel } from '../models/Event'; 

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find({});
        res.status(200).json({ categories });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const categoryDoc = await CategoryModel.findOne({ _id: categoryId }).populate({
            path: 'events',
            select: 'name'
        });

        if (!categoryDoc) {
            return res.status(404).json({ message: 'No Category found.' });
        }

        res.status(200).json({ category: categoryDoc });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
