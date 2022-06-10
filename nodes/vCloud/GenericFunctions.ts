import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	OptionsWithUri,
} from 'request';

import {
	IDataObject,
	ILoadOptionsFunctions,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import {
	vCloudDirectorCredentials,
} from './types';

export async function vCloudDirectorApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	Token: string
) {
	const credentials = await this.getCredentials('vCloudDirector') as vCloudDirectorCredentials;
	
	const options: OptionsWithUri = {
		headers: {
			'Authorization': 'Bearer ' + Token,
			'Accept': 'application/*+json;version=35.0',
		},
		method,
		body,
		qs,
		uri: `${credentials.host}/api/${endpoint}`,
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
		return await this.helpers.request!(options);
	} catch (error:any) {
		throw new NodeApiError(this.getNode(), {error:error});
	}
}


/**
 * Get a Token based on vCloud Director account username and password.
 */
 export async function getToken(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	{ username, password, host }: vCloudDirectorCredentials,
) {

	const options: OptionsWithUri = {
		headers: {
			'Accept': 'application/*+json;version=35.0',
		},
		method: 'POST',
		uri: `${host}/api/sessions`,
		json: true,
		auth: {
			username: `${username}`,
			password: `${password}`
		},
		rejectUnauthorized: false
	};
	
	try {
		const token = await this.helpers.request!(options);
		return token.response.headers['X-VMWARE-VCLOUD-ACCESS-TOKEN'];
	} catch (error:any) {
		throw new NodeApiError(this.getNode(), {error:error});
	}
}