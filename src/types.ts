export interface FetchRequestParams {
	method: 'GET' | 'POST' | 'UPDATE' | 'OPTIONS' | 'DELETE' | 'PUT' | 'PATCH',
	endpoint: string,
	body?: any,
	headers?: any,
	customConfig?: any,
	tokenBuilder?(): string | Promise<string>,
	urlPrefix?: string,
	fetchHandler?: any,
	directOut?: Boolean,
}

export interface BeamVariables {
	[variableName: string]: any
}

export type RequestPreprocessor = (params: FetchRequestParams) => FetchRequestParams

export interface BeamConfigParams {
	tokenBuilder?(): string | Promise<string>,
	urlPrefix?: string,
	fetchHandler?: any,
	directOut?: boolean
	preprocessor?: RequestPreprocessor,
	variables?: BeamVariables
}

export interface RequestResponse {
	status: number,
	response: any,
	data?: any,
}