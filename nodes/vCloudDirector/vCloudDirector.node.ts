import { json } from 'express';
import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeExecutionData, INodeParameters, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { vCloudDirectorApiRequest, getxToken } from './GenericFunctions';
import { vCloudDirectorCredentials } from './types';

export class vCloudDirector implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'VMware vCloud Director',
		name: 'vCloudDirector',
		icon: 'file:vcloud.png',
		group: ['transform'],
		version: 1,
		description: 'VMware vCloud DirectorApi',
		defaults: {
			name: 'vCloudDirector',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'vCloudDirector',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Organisation',
						value: 'org',
					},
				],
				default: 'org',
				description: 'Resource to use',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a record',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Retrieve a record',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a record',
					},					
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a record',
					},
				],
				default: 'get',
				description: 'Operation to perform',
			},
			{
				displayName: 'Id',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation:[
							'get',
							'delete',
							'update',
						],
					},
				},
				default: '',
				description: 'Id of Resource',
			},
			{
				displayName: 'Values to Set',
				name: 'values',
				placeholder: 'Add Value',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					sortable: true,
				},
				description: 'The value to set.',
				default: {},
				options: [
					{
						name: 'attributes',
						displayName: 'Attributes',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of value to set',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value to set.',
							},
						],
					},
				],
				displayOptions: {
					show: {
						operation:[
							'create',
							'update',
						],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnItems: INodeExecutionData[] = [];
		
		const resource = this.getNodeParameter('resource', 0, '') as string;
		const operation = this.getNodeParameter('operation', 0, '') as string;
		let item: INodeExecutionData;

		const credentials = await this.getCredentials('vCloudDirector') as vCloudDirectorCredentials;
		const token = await getxToken.call(this,credentials);
		
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {

			try{
				//--------------------------------------------------------
				// 						Get
				//--------------------------------------------------------
				if(operation == 'get'){
					const id = this.getNodeParameter('id', itemIndex, '') as string;
					
					const endpoint = `${resource}/${id}`;
					
					item = items[itemIndex];
					const newItem: INodeExecutionData = {
						json: {},
						binary: {},
					};
					newItem.json = await vCloudDirectorApiRequest.call(this,'Get', endpoint, {}, {},token);
					returnItems.push(newItem);
				}


				//--------------------------------------------------------
				// 						Update
				//--------------------------------------------------------
				if(operation == 'update'){
					const id = this.getNodeParameter('id', itemIndex, '') as string;
					const endpoint = `${resource}/${id}`;
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
					newItem.json = await vCloudDirectorApiRequest.call(this,'Put', endpoint, toCreate, {},token);
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
					newItem.json = await vCloudDirectorApiRequest.call(this,'Post', endpoint, toCreate, {},token);
					returnItems.push(newItem);
				}		

				//--------------------------------------------------------
				// 						Delete
				//--------------------------------------------------------
				if(operation == 'delete'){
					const id = this.getNodeParameter('id', itemIndex, '') as string;
					const endpoint = `${resource}/${id}`;

					item = items[itemIndex];
					const newItem: INodeExecutionData = {
						json: {},
						binary: {},
					};
					newItem.json = await vCloudDirectorApiRequest.call(this,'Delete', endpoint, {}, {},token);
					
					returnItems.push(newItem);
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