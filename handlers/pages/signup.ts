import { RequestHandler, Request, Response } from 'express';

const signup: RequestHandler = (_req: Request, res: Response) => {
    const { csrfToken } = res.locals;
    res.render('pages/signup', { csrfToken });
};

export default signup;
