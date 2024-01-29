import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
    description: string;
    events: mongoose.Types.ObjectId[];
    image: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    image: { type: String, required: true },
});

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);

export default CategoryModel;
