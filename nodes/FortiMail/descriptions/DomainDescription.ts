import {
	INodeProperties,
} from 'n8n-workflow';

import {
	makeSimpleField,
	domainAdditionalFieldsOptions,
} from './SharedFields';

export const domainOperations: INodeProperties[] = [
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

export const domainFields: INodeProperties[] = [
	// ----------------------------------------
	//              domain: create
	// ----------------------------------------
	makeSimpleField('domain', 'create'),
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
		default: '0',
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
					'create',
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
		options: domainAdditionalFieldsOptions,
	},

	// ----------------------------------------
	//               domain: get
	// ----------------------------------------
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
	makeSimpleField('domain', 'get'),

	// ----------------------------------------
	//              domain: getAll
	// ----------------------------------------
	//{
	//	displayName: 'Return All',
	//	name: 'returnAll',
	//	type: 'boolean',
	//	default: false,
	//	description: 'Whether to return all results or only up to a given limit',
	//	displayOptions: {
	//		show: {
	//			resource: [
	//				'domain',
	//			],
	//			operation: [
	//				'getAll',
	//			],
	//		},
	//	},
	//},
	//makeSimpleField('domain', 'getAll'),

	// ----------------------------------------
	//              domain: update
	// ----------------------------------------
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
	makeSimpleField('domain', 'update'),
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
		options: domainAdditionalFieldsOptions,
	},
];