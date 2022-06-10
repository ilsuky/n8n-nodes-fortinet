import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, ILoadOptionsFunctions } from 'n8n-workflow';
import { vCloudDirectorCredentials } from './types';
export declare function vCloudDirectorApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions, method: string, endpoint: string, body: IDataObject | undefined, qs: IDataObject | undefined, Token: string): Promise<any>;
export declare function getToken(this: IExecuteFunctions | ILoadOptionsFunctions, { username, password, host }: vCloudDirectorCredentials): Promise<any>;
