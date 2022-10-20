import mongoose from 'mongoose';

/** Establishing DB Connection */
export const establishConnection = () => {
    const mongoURI = process.env.MONGO_URI || `mongodb://localhost:27017/shekharam_db`
    mongoose.connect(mongoURI).then(() => {
        console.info('Database connection Established:', mongoURI);
    }).catch((err) => {
        console.error(err);
    });
}