import jwt from 'jsonwebtoken';
import JWTPayload from '../../types/jwtPayload';
import getSecretJWT from './getSecretJWT';

const verifyJWT = (token: string) :JWTPayload | never => {
    const secret = getSecretJWT();
    return jwt.verify(token, secret) as JWTPayload;
};

export default verifyJWT;
