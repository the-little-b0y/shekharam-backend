import express, { Application } from 'express';
import cors from 'cors';
import { setEnvs } from '../env/index';
import { establishConnection } from './database/index';
import { router } from './route/index';
import './utils/jwtPassport';

setEnvs();
establishConnection();

const app: Application = express();
app.use(express.json());

app.use(cors({ 
    origin: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-auth-token', 'Authorization'],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE']
}))

app.use('/v1', router);

app.listen(Number(process.env.PORT), () => {
    console.info('Server started on port: ' + Number(process.env.PORT));
});
