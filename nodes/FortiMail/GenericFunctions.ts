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
	FortiMailCredentials,
} from './types';

export async function FortiMailApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	Token: string
) {
	const credentials = await this.getCredentials('FortiMail') as FortiMailCredentials;
	
	const options: OptionsWithUri = {
		headers: {
			'Cookie': Token,
		},
		method,
		body,
		qs,
		uri: `${credentials.host}/api/v1/${endpoint}`,
		json: true,
		gzip: true,
		//@ts-ignore
		skipSslCertificateValidation: true,
		rejectUnauthorized: false,
	};

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	} 

	if (Object.keys(body).length === 0) {
		delete options.body;
	}
	try {
		const resp = await this.helpers.request!(options);
		console.log(resp);
		return resp;
	} catch (error:any) {
		throw new NodeApiError(this.getNode(), {error:error});
	}
}


/**
 * Get a Token based on vCloud Director account username and password.
 */
 export async function getxToken(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	{ username, password, host }: FortiMailCredentials,
) {

	const credentials = await this.getCredentials('FortiMail') as FortiMailCredentials;
	const options: OptionsWithUri = {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		uri: `${credentials.host}/api/v1/AdminLogin`,
		json: true,
		body: '{"name":"' + credentials.username + '","password":"' + credentials.password +'"}',
		//@ts-ignore
		resolveWithFullResponse: true,
		skipSslCertificateValidation: true,		
	};
	
	try {
		const cookie = await this.helpers.request!(options);
		const cookieheader = cookie.headers['set-cookie'];
		return cookieheader;
	} catch (error:any) {
		throw new NodeApiError(this.getNode(), {error:error});
	}
}