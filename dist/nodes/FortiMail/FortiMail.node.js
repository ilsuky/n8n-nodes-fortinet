"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortiMail = void 0;
const descriptions_1 = require("./descriptions");
const GenericFunctions_1 = require("./GenericFunctions");
class FortiMail {
    constructor() {
        this.description = {
            displayName: 'Fortinet FortiMail',
            name: 'FortiMail',
            icon: 'file:fortinet.png',
            group: ['transform'],
            version: 1,
            description: 'Fortinet FortiMail Api',
            defaults: {
                name: 'FortiMail',
                color: '#772244',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'FortiMail',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resources',
                    name: 'resource',
                    type: 'options',
                    options: [
                        {
                            name: 'Domain',
                            value: 'domain',
                            description: 'Domain Operation',
                        },
                    ],
                    default: 'domain',
                    description: 'Resource to use',
                },
                ...descriptions_1.domainOperations,
                ...descriptions_1.domainFields,
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnItems = [];
        const operation = this.getNodeParameter('operation', 0, '');
        const resource = this.getNodeParameter('resource', 0, '');
        let item;
        const credentials = await this.getCredentials('FortiMail');
        const token = await GenericFunctions_1.getxToken.call(this, credentials);
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                if (resource === 'domain') {
                    if (operation == 'get') {
                        const domainId = this.getNodeParameter('domainId', itemIndex);
                        const endpoint = '' + resource + '/' + domainId + '';
                        item = items[itemIndex];
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        newItem.json = await GenericFunctions_1.FortiMailApiRequest.call(this, 'Get', endpoint, {}, {}, token);
                        returnItems.push(newItem);
                    }
                    if (operation == 'update') {
                        const domainId = this.getNodeParameter('domainId', itemIndex);
                        const endpoint = `${resource}/${domainId}`;
                        const attributesInput = this.getNodeParameter('values.attributes', itemIndex, []);
                        item = items[itemIndex];
                        const attributes = {};
                        for (let attributesIndex = 0; attributesIndex < attributesInput.length; attributesIndex++) {
                            attributes[`${attributesInput[attributesIndex].name}`] = attributesInput[attributesIndex].value;
                        }
                        ;
                        const toCreate = {};
                        toCreate.data = {
                            "type": resource,
                            attributes
                        };
                        console.log(toCreate);
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        newItem.json = await GenericFunctions_1.FortiMailApiRequest.call(this, 'Put', endpoint, toCreate, {}, token);
                        returnItems.push(newItem);
                    }
                    if (operation == 'create') {
                        const endpoint = resource;
                        const attributesInput = this.getNodeParameter('values.attributes', itemIndex, []);
                        item = items[itemIndex];
                        const attributes = {};
                        for (let attributesIndex = 0; attributesIndex < attributesInput.length; attributesIndex++) {
                            attributes[`${attributesInput[attributesIndex].name}`] = attributesInput[attributesIndex].value;
                        }
                        ;
                        const toCreate = {};
                        toCreate.data = {
                            "type": resource,
                            attributes
                        };
                        console.log(toCreate);
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        newItem.json = await GenericFunctions_1.FortiMailApiRequest.call(this, 'Post', endpoint, toCreate, {}, token);
                        returnItems.push(newItem);
                    }
                    if (operation == 'delete') {
                        const domainId = this.getNodeParameter('domainId', itemIndex);
                        const endpoint = `${resource}/${domainId}`;
                        item = items[itemIndex];
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        newItem.json = await GenericFunctions_1.FortiMailApiRequest.call(this, 'Delete', endpoint, {}, {}, token);
                        returnItems.push(newItem);
                    }
                    if (operation === 'getAll') {
                        item = items[itemIndex];
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        const endpoint = '' + resource + '/';
                        newItem.json = await GenericFunctions_1.FortiMailApiRequest.call(this, 'Get', endpoint, {}, {}, token);
                        returnItems.push(newItem);
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnItems.push({ json: { error: error.message } });
                    continue;
                }
                throw error;
            }
        }
        return this.prepareOutputData(returnItems);
    }
}
exports.FortiMail = FortiMail;
//# sourceMappingURL=FortiMail.node.js.map