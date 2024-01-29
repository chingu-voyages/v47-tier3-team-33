import express from 'express';
import Category from '../models/Category';

const router = express.Router();


router.get("/", async(req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json({
            categories
        })
    } catch (error: any) {
        console.log(error.message);
    }
})

router.get("/:id", async(req, res) => {
    try {
        const categoryId = req.params.id;

        const categoryDoc = await Category.findOne({ _id: categoryId }).populate({
        path: 'events',
        select: 'name'
        });

    if (!categoryDoc) {
      return res.status(404).json({
        message: 'No Category found.'
      });
    }

    res.status(200).json({
        category: categoryDoc
    })
    
    } catch (error:any) {
        console.log(error.message);
    }
})