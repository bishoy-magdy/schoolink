import { JsonWebTokenError, TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

class JWTErrors extends Error {
    userMessage: { message: string; statusCode: number; };

    constructor(err: VerifyErrors) {
        super();
        this.name = 'JWT Error';
        this.message = err.message;

        if (err instanceof TokenExpiredError) {
            this.userMessage = { message: 'Token Expired', statusCode: 401 };
        } else if (err instanceof JsonWebTokenError) {
            this.userMessage = { message: 'Unauthorized', statusCode: 401 };
        } else {
            this.userMessage = { message: 'Something wrong :(', statusCode: 401 };
        }
    }
}

export default JWTErrors;
