import { SignOptions } from 'jsonwebtoken';

const jwtConfig: SignOptions = {
    expiresIn: '5m',
};

export default jwtConfig;
