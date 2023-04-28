import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import DataBases from '../../databases';

const getComments: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const postId: string = req.query.id as string;
        const comments = await DataBases.sqlite.getComments(postId);
        res.send({ comments });
    })().catch(next);
};

export default getComments;
