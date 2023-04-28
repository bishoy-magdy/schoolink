import { OAuth2Client } from 'google-auth-library';

// for Google provider
export default class OAuth2 {
    static google: OAuth2Client;

    static init() {
        OAuth2.google = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URIS,
        );
    }

    static url(): string {
        return OAuth2.google.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
            ],
        });
    }
}
