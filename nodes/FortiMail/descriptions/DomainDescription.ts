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
		displayName: 'Domain', // on create, only _one_ must be passed in
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
	makeSimpleField('domain', 'getAll'),

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