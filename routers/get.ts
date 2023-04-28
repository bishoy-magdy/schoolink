import { Router } from 'express';
import getPost from '../handlers/post/getPost';
import getComments from '../handlers/comment/getComments';
import getAttachment from '../handlers/attachment/getAttacment';
import { AuthLevel } from '../etc/constants';
import authenticator from '../middlewares/authenticator';
import { csrfToken } from '../middlewares/csrf';
// import isAdmin from '../middlewares/isAdmin';

const get = Router();
const { STRICT, LENIENT } = AuthLevel;

get.get('/post', authenticator(LENIENT), csrfToken, getPost)
    .get('/comments', authenticator(STRICT), getComments)
    .get('/attachment', getAttachment);

export default get;
