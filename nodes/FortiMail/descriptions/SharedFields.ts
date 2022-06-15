import {
	INodeProperties,
} from 'n8n-workflow';

import {
	Operation,
	Resource,
} from '../types';

export const domainAdditionalFieldsOptions: INodeProperties['options'] = [
	{
		displayName: 'Family Name',
		name: 'family_name',
		type: 'string',
		default: '',
		description: 'Person’s last name',
	},
];	

export const makeSimpleField = (resource: Resource, operation: Operation): INodeProperties => ({
	displayName: 'Simplify',
	name: 'simple',
	type: 'boolean',
	displayOptions: {
		show: {
			resource: [
				resource,
			],
			operation: [
				operation,
			],
		},
	},
	default: true,
	description: 'Whether to return a simplified version of the response instead of the raw data',
});