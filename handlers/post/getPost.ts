import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import DataBases from '../../databases';

const getPost: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const postId = req.query.id;
        const { jwtPayload, csrfToken } = res.locals;
        const username = jwtPayload ? jwtPayload.username : undefined;

        if (!postId) {
            return res.send({ message: 'Post id not define' });
        }

        const postContentPro = DataBases.sqlite.getPostById(postId as string);
        const postLikesPro = DataBases.sqlite.getLikes(postId as string);
        const [postContent, postLikes] = await Promise.all([postContentPro, postLikesPro]);

        const {
            title, content, poastedAt, username: by,
        } = postContent;
        const { likes } = postLikes;

        return res.render('pages/post', {
            postId,
            username,
            csrfToken,
            post: {
                by,
                title,
                content,
                poastedAt,
                likes,
            },
        });
    })().catch(next);
};

export default getPost;
