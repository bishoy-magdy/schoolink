import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import DataBases from '../../../databases';
import Like from '../../../types/like';

const addLike: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { postId } = req.body;
        const { userId } = res.locals.jwtPayload;
        const like: Like = {
            userId,
            postId,
        };
        await DataBases.sqlite.addLike(like);
        res.redirect(`/get/post?id=${postId}`);
    })().catch(next);
};

export default addLike;
