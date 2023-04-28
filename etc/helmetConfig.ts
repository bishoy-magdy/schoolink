import { HelmetOptions } from 'helmet';
import { allowedJSPaths } from './constants';

const helmetConfig: HelmetOptions = {
    contentSecurityPolicy: {
        directives: {
            scriptSrc: allowedJSPaths,
        },
    },
    noSniff: false,
};
export default helmetConfig;
