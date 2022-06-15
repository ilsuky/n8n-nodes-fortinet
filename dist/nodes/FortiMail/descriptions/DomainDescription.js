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
        name: 'domain_name',
        description: 'FQDN name of the domain',
        type: 'string',
        required: true,
        default: '',
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
    },
    {
        displayName: 'Relay type',
        name: 'mxflag',
        type: 'options',
        default: 'subscribed',
        description: 'Subscription status of this email address',
        options: [
            {
                name: 'MX Record(this domain)',
                value: '1',
            },
            {
                name: 'Host',
                value: '0',
            },
        ],
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
    },
    {
        displayName: 'SMTP server',
        name: 'ip',
        description: '',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'create',
                ],
                mxflag: [
                    '0',
                ],
            },
        },
    },
    {
        displayName: 'SMTP server Port',
        name: 'port',
        description: '',
        type: 'string',
        default: '25',
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'create',
                ],
                mxflag: [
                    '0',
                ],
            },
        },
    },
    {
        displayName: 'Recipient Address Verification',
        name: 'recipient_verification',
        type: 'options',
        default: 'SMTP',
        description: 'Subscription status of this email address',
        options: [
            {
                name: 'SMTP',
                value: 'SMTP',
            },
            {
                name: 'Disable',
                value: '--',
            },
        ],
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
    },
    {
        displayName: 'Is subdomain',
        name: 'is_subdomain',
        type: 'boolean',
        default: false,
        description: '',
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
        displayName: 'Main domain',
        name: 'maindomain',
        description: '',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: [
                    'domain',
                ],
                operation: [
                    'create',
                ],
                is_subdomain: [
                    true,
                ],
            },
        },
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