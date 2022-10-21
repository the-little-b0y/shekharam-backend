import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    mobileNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {type: Number, default: 1},
    actionCount: {type:Number, default:1},
    creation: { type: Date, default: Date.now },
    updation: { type: Date, default: Date.now }
});

export const User = mongoose.model('user', UserSchema);