import { ICredentialType, NodePropertyTypes, INodeProperties } from 'n8n-workflow';

export class vCloudDirector implements ICredentialType {
	name = 'vCloudDirector';

	displayName = 'VMware vCloud Director';

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