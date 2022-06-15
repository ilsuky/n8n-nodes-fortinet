"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainFields = exports.domainOperations = void 0;
const SharedFields_1 = require("./SharedFields");
exports.domainOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
            },
            {
                name: 'Get',
                value: 'get',
            },
            {
                name: 'Get All',
                value: 'getAll',
            },
            {
                name: 'Update',
                value: 'update',
            },
            {
                name: 'Delete',
                value: 'delete',
            },
        ],
        default: 'create',
    },
];
exports.domainFields = [
    SharedFields_1.makeSimpleField('domain', 'create'),
    {
        displayName: 'Domain',
        name: 'email_addresses',
        type: 'fixedCollection',
        default: {},
        placeholder: 'Add Email Address Field',
        description: 'domain’s email addresses',
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'create',
                ],
            },
        },
        options: [
            {
                displayName: 'Email Addresses Fields',
                name: 'email_addresses_fields',
                values: [
                    {
                        displayName: 'Address',
                        name: 'address',
                        type: 'string',
                        default: '',
                        description: 'domain\'s email address',
                    },
                    {
                        displayName: 'Primary',
                        name: 'primary',
                        type: 'hidden',
                        default: true,
                        description: 'Whether this is the domain\'s primary email address',
                    },
                    {
                        displayName: 'Status',
                        name: 'status',
                        type: 'options',
                        default: 'subscribed',
                        description: 'Subscription status of this email address',
                        options: [
                            {
                                name: 'Bouncing',
                                value: 'bouncing',
                            },
                            {
                                name: 'Previous Bounce',
                                value: 'previous bounce',
                            },
                            {
                                name: 'Previous Spam Complaint',
                                value: 'previous spam complaint',
                            },
                            {
                                name: 'Spam Complaint',
                                value: 'spam complaint',
                            },
                            {
                                name: 'Subscribed',
                                value: 'subscribed',
                            },
                            {
                                name: 'Unsubscribed',
                                value: 'unsubscribed',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'create',
                ],
            },
        },
        options: SharedFields_1.domainAdditionalFieldsOptions,
    },
    {
        displayName: 'domain ID',
        name: 'domainId',
        description: 'ID of the domain to retrieve',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'get',
                ],
            },
        },
    },
    SharedFields_1.makeSimpleField('domain', 'get'),
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        description: 'Whether to return all results or only up to a given limit',
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'getAll',
                ],
            },
        },
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 25,
        description: 'Max number of results to return',
        typeOptions: {
            minValue: 1,
            maxValue: 25,
        },
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'getAll',
                ],
                returnAll: [
                    false,
                ],
            },
        },
    },
    SharedFields_1.makeSimpleField('domain', 'getAll'),
    {
        displayName: 'domain ID',
        name: 'domainId',
        description: 'ID of the domain to update',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'update',
                ],
            },
        },
    },
    SharedFields_1.makeSimpleField('domain', 'update'),
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'update',
                ],
            },
        },
        options: SharedFields_1.domainAdditionalFieldsOptions,
    },
];
//# sourceMappingURL=DomainDescription.js.map