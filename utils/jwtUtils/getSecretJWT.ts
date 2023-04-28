const getSecretJWT = () : string | never => {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
        throw new Error('JWT SECRET KEY NOT FOUND');
    }
    return secret;
};

export default getSecretJWT;
