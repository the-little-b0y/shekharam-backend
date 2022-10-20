import express from 'express';
import cors from 'cors';
import { setEnvs } from '../env/index';
import { establishConnection } from './database/index';

setEnvs();
establishConnection();

const app = express();
app.use(express.json());

app.use(cors({ 
    origin: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-auth-token'],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE']
}))

app.listen(Number(process.env.PORT), () => {
    console.info('Server started on port: ' + Number(process.env.PORT));
});
