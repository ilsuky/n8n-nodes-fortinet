import { INodeProperties } from 'n8n-workflow';
import { Operation, Resource } from '../types';
export declare const domainAdditionalFieldsOptions: INodeProperties['options'];
export declare const makeSimpleField: (resource: Resource, operation: Operation) => INodeProperties;
