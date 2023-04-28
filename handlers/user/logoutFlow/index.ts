import { RequestHandler } from 'express';
import logout from './logout';

const logoutFlow: RequestHandler[] = [logout];

export default logoutFlow;
