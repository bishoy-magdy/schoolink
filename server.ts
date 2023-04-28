/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import DataBases from './databases';
import auth from './routers/auth';
import globalMiddlewares from './middlewares/globalMiddlewares';
import global from './routers/global';
import admin from './routers/admin';
import errorHandler from './middlewares/error';
import OAuth2 from './etc/googleOAuth2.0';
import create from './routers/create';
import get from './routers/get';
import add from './routers/add';

(async () => {
    await DataBases.initDB();

    dotenv.config();
    OAuth2.init();

    const app = express();
    const port = process.env.PORT || 3000;

    app.set('views', join(__dirname, 'public', 'views'));
    app.set('view engine', 'ejs');

    app.use(...globalMiddlewares());

    app.use('/', global);
    app.use('/auth', auth);
    app.use('/admin', admin);
    app.use('/get', get);
    app.use('/create', create);
    app.use('/add', add);

    app.use(errorHandler);

    app.listen(port, async () => {
        console.log(`Server Listening on Port: ${port}`);
    });
})();
