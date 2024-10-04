import { DefaultAuthProvider } from 'adminjs';
import componentLoader from './component-loader.js';
import { DEFAULT_ADMIN } from './constants.js';
const provider = new DefaultAuthProvider({
    componentLoader,
    authenticate: async ({ email, password }) => {
        if (email === process.env.DEFAULT_ADMIN_EMAIL && password === process.env.DEFAULT_ADMIN_PASSWORD) {
            return Promise.resolve(DEFAULT_ADMIN);
        }
        return null;
    },
});
export default provider;
