class SQLError extends Error {
    userMessage: { message: string; statusCode: number; };

    constructor(err: any) {
        super();
        this.name = err.name;
        this.message = err.message;

        const { code } = err;
        switch (code) {
            case 'SQLITE_CONSTRAINT':
                this.userMessage = { message: 'violate constraint', statusCode: 502 };
                break;
            case 'SQLITE_MISMATCH':
                this.userMessage = { message: 'mismatch attribute', statusCode: 502 };

                break;
            default:
                this.userMessage = { message: 'Something wrong :(', statusCode: 502 };
        }
    }
}

export default SQLError;
