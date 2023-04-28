import { RequestHandler, Request, Response } from 'express';

const logout: RequestHandler = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            res.send('Something Went Wrong Try Again!');
        } else {
            res.clearCookie('token')
                .redirect('/home');
        }
    });
};

export default logout;
