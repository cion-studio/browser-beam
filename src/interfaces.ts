export interface FetchRequestParams {
	method: 'GET' | 'POST' | 'UPDATE' | 'OPTIONS' | 'DELETE' | 'PUT' | 'PATCH';
	endpoint: string;
	body?: any;
	headers?: any;
	customConfig?: any;
	tokenBuilder?(): string | Promise<string>;
	urlPrefix?: string;
	fetchHandler?: any;
}

export interface BeamConfigParams {
	tokenBuilder?(): string | Promise<string>;
	urlPrefix?: string;
	fetchHandler?: any;
}


export interface RequestResponse {
	status: number;
	response: any;
	data?: any;
}