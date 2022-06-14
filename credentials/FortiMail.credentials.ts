import { ICredentialType, NodePropertyTypes, INodeProperties } from 'n8n-workflow';

export class FortiMail implements ICredentialType {
	name = 'FortiMail';

	displayName = 'Fortinet FortiMail';

	properties: INodeProperties[] = [
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