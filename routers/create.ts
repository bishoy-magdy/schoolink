import { Router } from 'express';
import multer from '../middlewares/multer';
import addAttachments from '../handlers/attachment/addAttachmets';
import { AuthLevel } from '../etc/constants';
import authenticator from '../middlewares/authenticator';
import postCreationFlow from '../handlers/post/postCreationFlow';
import isAdmin from '../middlewares/isAdmin';

const create = Router();
const { STRICT } = AuthLevel;

create.post('/post', ...postCreationFlow)
    .post('/attachment', authenticator(STRICT), isAdmin, multer.single('attachment'), addAttachments);

export default create;
