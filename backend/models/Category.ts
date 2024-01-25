import mongoose, {Schema, Document} from 'mongoose';

interface ICategory extends Document {
    name: string;
    description: string;
    image: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true}
})

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema)

export default CategoryModel;