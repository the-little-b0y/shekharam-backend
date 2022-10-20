import dotenv from 'dotenv';
import path from 'path';

/** Setting Environment from .env files */
export const setEnvs = () => {
    const result = dotenv.config({
        path: `${path.resolve('env', `.env.${process.env.NODE_ENV}`)}`
    });
    
    if(result.error) {
        throw result.error;
    }
}
