import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import escape from 'validator/lib/escape';
import isEmpty from 'validator/lib/isEmpty';

const commentSanitizer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {
        postId, content, csrfToken,
    } = req.body;
    const isValid = !isEmpty(content, { ignore_whitespace: true });

    if (!isValid) {
        return res.send('invalid comment content');
    }

    Object.assign(
        res.locals,
        {
            postId,
            content: escape(content),
            commentedAt: Date.now(),
            csrfToken,
        },
    );

    return next();
};

export default commentSanitizer;
