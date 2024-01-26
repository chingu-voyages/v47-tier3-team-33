import mongoose, {Schema, Document} from 'mongoose';

interface IUser extends Document {
    name: string;
    surname: string;
    email: string;
    profile_img: string;
    events: string;
    interests: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true},
    surname: { type: String, required: true},
    email: { type: String, required: true},
    profile_img: { type: String, required: false},
    events: { type: String, required: false},
    interests: { type: String, required: true}
})

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel;