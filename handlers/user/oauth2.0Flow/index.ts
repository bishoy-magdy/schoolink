import { RequestHandler } from 'express';
import tokenCreator from '../../../middlewares/tokenCreator';
import oAuthStartPoint from './oAuthStartPoint';
import getOrCreateUser from './getOrCreateUser';

const oauth2Flow: RequestHandler[] = [
    oAuthStartPoint,
    getOrCreateUser,
    tokenCreator,
];

export default oauth2Flow;
