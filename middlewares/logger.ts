import { RequestHandler } from 'express';

const logger: RequestHandler = async (req, _res, next) => {
    const { path, method, body } = req;
    const table = {
        path,
        method,
        body,
        time: new Date().toLocaleString(),
    };
    // eslint-disable-next-line no-console
    console.table(table);
    next();
};

export default logger;
