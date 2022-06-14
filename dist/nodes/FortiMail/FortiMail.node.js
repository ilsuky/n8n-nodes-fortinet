"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortiMail = void 0;
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
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    options: [
                        {
                            name: 'Create',
                            value: 'create',
                            description: 'Create a record',
                        },
                        {
                            name: 'Get',
                            value: 'get',
                            description: 'Retrieve a record',
                        },
                        {
                            name: 'Update',
                            value: 'update',
                            description: 'Update a record',
                        },
                        {
                            name: 'Delete',
                            value: 'delete',
                            description: 'Delete a record',
                        },
                    ],
                    default: 'get',
                    description: 'Operation to perform',
                },
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
                {
                    displayName: 'FQDN name of the domain to query',
                    name: 'domain_name',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: [
                                'get',
                                'delete',
                                'update',
                            ],
                        },
                    },
                    default: '',
                    description: 'domain level resources',
                },
                {
                    displayName: 'Retrieve and Split Data Items',
                    name: 'split',
                    type: 'boolean',
                    displayOptions: {
                        show: {
                            operation: [
                                'get',
                            ],
                        },
                    },
                    default: true,
                    description: 'Retrieve and Split Data array into seperate Items',
                },
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
                const id = this.getNodeParameter('domain_name', itemIndex, '');
                if (operation == 'get') {
                    const split = this.getNodeParameter('split', itemIndex, '');
                    const endpoint = '' + resource + '/' + id + '';
                    console.log(endpoint);
                    if (split) {
                        const data = JSON.parse(JSON.stringify(await GenericFunctions_1.FortiMailApiRequest.call(this, 'Get', endpoint, {}, {}, token)));
                        for (let dataIndex = 0; dataIndex < data.collection.length; dataIndex++) {
                            const newItem = {
                                json: {},
                                binary: {},
                            };
                            newItem.json = data.collection[dataIndex];
                            returnItems.push(newItem);
                        }
                    }
                    else {
                        item = items[itemIndex];
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        newItem.json = await GenericFunctions_1.FortiMailApiRequest.call(this, 'Get', endpoint, {}, {}, token);
                        returnItems.push(newItem);
                    }
                }
                if (operation == 'update') {
                    const endpoint = `${resource}/${id}`;
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
                    const endpoint = `${resource}/${id}`;
                    item = items[itemIndex];
                    const newItem = {
                        json: {},
                        binary: {},
                    };
                    newItem.json = await GenericFunctions_1.FortiMailApiRequest.call(this, 'Delete', endpoint, {}, {}, token);
                    returnItems.push(newItem);
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