import Cryptr from 'cryptr';

/**
 * ANCHOR Auth Service
 * @date 9/12/2024 - 3:20:22 AM
 *
 * @export
 * @class AuthService
 * @typedef {AuthService}
 */
export class AuthService {
    private cryptr: Cryptr;

    constructor() {
        this.cryptr = new Cryptr(process.env.AUTH_SECRET_KEY);
    }

    /**
     * ANCHOR Encrypt
     * @date 9/12/2024 - 3:22:23 AM
     *
     * @param {string} payload
     * @returns {string}
     */
    encrypt(payload: string): string {
        return this.cryptr.encrypt(payload);
    }

    /**
     * ANCHOR Decrypt
     * @date 9/12/2024 - 3:22:46 AM
     *
     * @param {string} payload
     * @returns {string}
     */
    decrypt(payload: string): string {
        return this.cryptr.decrypt(payload);
    }
}
