"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortiMail = void 0;
class FortiMail {
    constructor() {
        this.name = 'FortiMail';
        this.displayName = 'Fortinet FortiMail';
        this.properties = [
            {
                displayName: 'Host',
                name: 'host',
                type: 'string',
                default: 'https://',
            },
            {
                displayName: 'Username',
                name: 'username',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Password',
                name: 'password',
                type: 'string',
                default: '',
            },
        ];
    }
}
exports.FortiMail = FortiMail;
//# sourceMappingURL=FortiMail.credentials.js.map