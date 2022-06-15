import { json } from 'express';
import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeExecutionData, INodeParameters, INodeType, INodeTypeDescription } from 'n8n-workflow';

import {
	domainFields,
	domainOperations,
} from './descriptions';

import { FortiMailApiRequest, getxToken } from './GenericFunctions';
import { FortiMailCredentials } from './types';

export class FortiMail implements INodeType {
	description: INodeTypeDescription = {
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
			...domainOperations,
			...domainFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnItems: INodeExecutionData[] = [];
		
		const operation = this.getNodeParameter('operation', 0, '') as string;
		
		const resource = this.getNodeParameter('resource', 0, '') as string;
		
		let item: INodeExecutionData;

		const credentials = await this.getCredentials('FortiMail') as FortiMailCredentials;
		const token = await getxToken.call(this,credentials);
		
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try{
				if (resource === 'domain') {				
					
					//--------------------------------------------------------
					// 						Get
					//--------------------------------------------------------
					if(operation == 'get'){
						const domainId = this.getNodeParameter('domainId', itemIndex) as string;
						
						const endpoint = '' + resource + '/' + domainId + '';
						
						item = items[itemIndex];
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						newItem.json = await FortiMailApiRequest.call(this, 'Get', endpoint, {}, {}, token);
						returnItems.push(newItem);
							
					}

					//--------------------------------------------------------
					// 						Update
					//--------------------------------------------------------
					if(operation == 'update'){
						const domainId = this.getNodeParameter('domainId', itemIndex) as string;
						const endpoint = `${resource}/${domainId}`;
						const attributesInput = this.getNodeParameter('values.attributes', itemIndex, []) as INodeParameters[];
						item = items[itemIndex];
						
						
						const attributes:IDataObject ={};
						for (let attributesIndex = 0; attributesIndex < attributesInput.length; attributesIndex++) {
							attributes[`${attributesInput[attributesIndex].name}`] = attributesInput[attributesIndex].value;
						};
						const toCreate:IDataObject ={};
						toCreate.data ={
							"type": resource,
							attributes
						};
						
						console.log(toCreate);
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await FortiMailApiRequest.call(this,'Put', endpoint, toCreate, {},token);
						returnItems.push(newItem);
					}	

					//--------------------------------------------------------
					// 						Create
					//--------------------------------------------------------
					if(operation == 'create'){

						const endpoint = resource;
						const attributesInput = this.getNodeParameter('values.attributes', itemIndex, []) as INodeParameters[];
						item = items[itemIndex];
						
						
						const attributes:IDataObject ={};
						for (let attributesIndex = 0; attributesIndex < attributesInput.length; attributesIndex++) {
							attributes[`${attributesInput[attributesIndex].name}`] = attributesInput[attributesIndex].value;
						};
						const toCreate:IDataObject ={};
						toCreate.data ={
							"type": resource,
							attributes
						};
						
						console.log(toCreate);
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await FortiMailApiRequest.call(this,'Post', endpoint, toCreate, {},token);
						returnItems.push(newItem);
					}		

					//--------------------------------------------------------
					// 						Delete
					//--------------------------------------------------------
					if(operation == 'delete'){
						const domainId = this.getNodeParameter('domainId', itemIndex) as string;
						const endpoint = `${resource}/${domainId}`;

						item = items[itemIndex];
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						newItem.json = await FortiMailApiRequest.call(this,'Delete', endpoint, {}, {},token);
						
						returnItems.push(newItem);
					}
					
					//--------------------------------------------------------
					// 						getAll
					//--------------------------------------------------------					
					if (operation === 'getAll') {
						
						item = items[itemIndex];
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = '' + resource + '/';
						newItem.json = await FortiMailApiRequest.call(this, 'Get', endpoint, {}, {}, token);
						returnItems.push(newItem);

					}					
				}
				
			} catch (error:any) {
				if (this.continueOnFail()) {
					returnItems.push({json:{ error: error.message}});
					continue;
				}
				throw error;
			}

		}

		return this.prepareOutputData(returnItems);
	}
}