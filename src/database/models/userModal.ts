import { Schema, model } from 'mongoose';
import { UserInterface } from '../../contracts/userInterface';

const UserSchema = new Schema<UserInterface>({
    mobileNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    va: { type: String },
    greeting: { type: String },
    status: {type: Number, default: 1},
    actionCount: {type:Number, default:1},
    creation: { type: Date, default: Date.now },
    updation: { type: Date, default: Date.now }
});

export const User = model<UserInterface>('user', UserSchema);
