import { Router } from 'express';
import commentAdditionFlow from '../handlers/comment/additionFlow';
import likeAdditionFlow from '../handlers/like/additionFlow';

const add = Router();

add.post('/like', ...likeAdditionFlow)
    .post('/comment', ...commentAdditionFlow);

export default add;
