export type FortiMailCredentials = {
	username: string;
	password: string;
	host: string;
}

export type GetAllAdditionalOptions = {
	order?: {
		fields: Array<{
			field: string;
			direction: string;
		}>
	};
	filters?: {
		fields: Array<{
			field: string;
			operator: string;
			value: string;
		}>;
	};
	filterType: string,
	search: string,
};

export type LoadedResource = {
	id: number;
	name: string;
}

export type Accumulator = {
	[key: string]: string;
}

export type Row = Record<string, string>

export type FieldsUiValues = Array<{
	fieldId: string;
	fieldValue: string;
}>;

export type Resource = 'domain';
export type Operation = 'create' | 'delete' | 'update' | 'get' | 'getAll';
