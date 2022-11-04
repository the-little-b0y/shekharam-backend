import { connect } from 'mongoose';

/** Establishing DB Connection */
export const establishConnection = () => {
    const mongoURI: string = process.env.DATABASE_URL || `mongodb://localhost:27017/shekharam_db`
    connect(mongoURI).then(() => {
        console.info('Database connection Established:', mongoURI);
    }).catch((err) => {
        console.error(err);
    });
}