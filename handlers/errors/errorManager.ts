import JWTErrors from './jwtErrors';
import SQLError from './sqlErrors';

class ErrorManager {
    static SQL(err: any): never {
        throw new SQLError(err);
    }

    static JWT(err: any): never {
        throw new JWTErrors(err);
    }
}

export default ErrorManager;
