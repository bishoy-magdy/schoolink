import {
    ErrorRequestHandler, Request, Response, NextFunction,
} from 'express';
import Error from '../types/error';

const errorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.log(err, '<<<<<<<<<');
        const { userMessage } = err;
        res.status(userMessage.statusCode).send(userMessage.message);
        // res.send(err);
    } else {
        next();
    }
};

export default errorHandler;
