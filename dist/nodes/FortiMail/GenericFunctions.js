"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getxToken = exports.FortiMailApiRequest = void 0;
const n8n_workflow_1 = require("n8n-workflow");
async function FortiMailApiRequest(method, endpoint, body = {}, qs = {}, Token) {
    const credentials = await this.getCredentials('FortiMail');
    const options = {
        headers: {
            'Cookie': Token,
        },
        method,
        body,
        qs,
        uri: `${credentials.host}/api/v1/${endpoint}`,
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
        const resp = await this.helpers.request(options);
        console.log(resp);
        return resp;
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), { error: error });
    }
}
exports.FortiMailApiRequest = FortiMailApiRequest;
async function getxToken({ username, password, host }) {
    const credentials = await this.getCredentials('FortiMail');
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        uri: `${credentials.host}/api/v1/AdminLogin`,
        json: true,
        body: '{"name":"' + credentials.username + '","password":"' + credentials.password + '"}',
        resolveWithFullResponse: true,
        rejectUnauthorized: false,
    };
    try {
        const cookie = await this.helpers.request(options);
        const cookieheader = cookie.headers['set-cookie'];
        return cookieheader;
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), { error: error });
    }
}
exports.getxToken = getxToken;
//# sourceMappingURL=GenericFunctions.js.map