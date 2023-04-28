import jwt from 'jsonwebtoken';
import JWTPayload from '../../types/jwtPayload';
import getSecretJWT from './getSecretJWT';
import jwtConfig from '../../etc/jwtConfig';

const signJWT = (obj: JWTPayload): string | never => {
    const secret = getSecretJWT();
    return jwt.sign(obj, secret, jwtConfig);
};

export default signJWT;
