// Global Middlewares
import express, { RequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { join } from 'path';
import helmet from 'helmet';
import logger from './logger';
import sessionConfig from '../etc/sessionConfig';
import helmetConfig from '../etc/helmetConfig';

const { urlencoded, json, static: staticFiles } = express;

const staticFilesPath = join(__dirname, '..', 'public', 'static');

const globalMiddlewares = () : RequestHandler [] => [
    helmet(helmetConfig),
    staticFiles(staticFilesPath),
    urlencoded({ extended: true }),
    json(),
    cookieParser(),
    session(sessionConfig()),
    logger,
];

export default globalMiddlewares;
