"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vCloudDirector = void 0;
class vCloudDirector {
    constructor() {
        this.name = 'vCloudDirector';
        this.displayName = 'VMware vCloud Director';
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
exports.vCloudDirector = vCloudDirector;
//# sourceMappingURL=vCloud.credentials.js.map