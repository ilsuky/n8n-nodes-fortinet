"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.vCloudDirectorApiRequest = void 0;
const n8n_workflow_1 = require("n8n-workflow");
async function vCloudDirectorApiRequest(method, endpoint, body = {}, qs = {}, Token) {
    const credentials = await this.getCredentials('vCloudDirector');
    const options = {
        headers: {
            'Authorization': 'Bearer ' + Token,
            'Accept': 'application/*+json;version=35.0',
        },
        method,
        body,
        qs,
        uri: `${credentials.host}/api/${endpoint}`,
        json: true,
        gzip: true,
        rejectUnauthorized: false,
    };
    if (Object.keys(qs).length === 0) {
        delete options.qs;
    }
    if (Object.keys(body).length === 0) {
        delete options.body;
    }
    try {
        return await this.helpers.request(options);
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), { error: error });
    }
}
exports.vCloudDirectorApiRequest = vCloudDirectorApiRequest;
async function getToken({ username, password, host }) {
    const credentials = await this.getCredentials('vCloudDirector');
    const options = {
        headers: {
            'Accept': 'application/*+json;version=35.0'
        },
        method: 'POST',
        uri: `${credentials.host}/api/sessions`,
        json: true,
        auth: {
            username: `${credentials.username}`,
            password: `${credentials.password}`
        },
        resolveWithFullResponse: true,
    };
    console.log(options);
    try {
        const cookie = await this.helpers.request(options);
        console.log(cookie);
        const cookieheader = cookie.headers['X-VMWARE-VCLOUD-ACCESS-TOKEN'];
        return cookieheader;
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), { error: error });
    }
}
exports.getToken = getToken;
//# sourceMappingURL=GenericFunctions.js.map