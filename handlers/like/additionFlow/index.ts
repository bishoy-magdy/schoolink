import { RequestHandler } from 'express';
import { AuthLevel } from '../../../etc/constants';
import authenticator from '../../../middlewares/authenticator';
import addLike from './addLike';

const { STRICT } = AuthLevel;

const likeAdditionFlow: RequestHandler[] = [authenticator(STRICT), addLike];

export default likeAdditionFlow;
