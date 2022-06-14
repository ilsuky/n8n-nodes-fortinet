import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, ILoadOptionsFunctions } from 'n8n-workflow';
import { FortiMailCredentials } from './types';
export declare function FortiMailApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions, method: string, endpoint: string, body: IDataObject | undefined, qs: IDataObject | undefined, Token: string): Promise<any>;
export declare function getxToken(this: IExecuteFunctions | ILoadOptionsFunctions, { username, password, host }: FortiMailCredentials): Promise<any>;
