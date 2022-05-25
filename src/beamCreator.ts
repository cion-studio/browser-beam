import createFetchRequest from './createFetchRequest'
import { BeamConfigParams, BeamVariables, FetchRequestParams, RequestPreprocessor } from './types'

const beamCreator = (fetchHandler: any) => class Beam {
	tokenBuilder?
	urlPrefix?
	fetchHandler?
	directOut?: Boolean
	preprocessor: RequestPreprocessor
	variables: BeamVariables

	constructor({ tokenBuilder, urlPrefix, directOut, preprocessor, variables }: BeamConfigParams = {}) {
		this.tokenBuilder = tokenBuilder
		this.urlPrefix = urlPrefix ? urlPrefix : ''
		this.fetchHandler = fetchHandler
		this.directOut = directOut
		this.variables = variables || {}

		if (preprocessor) {
			this.preprocessor = preprocessor
		} else {
			this.preprocessor = (params) => params
		}
	}

	//Set options
	configure({ tokenBuilder, urlPrefix, directOut, preprocessor, variables }: BeamConfigParams) {
		if (tokenBuilder) {
			this.tokenBuilder = tokenBuilder
		}

		if (urlPrefix) {
			this.urlPrefix = urlPrefix
		}

		if (preprocessor) {
			this.preprocessor = preprocessor
		}

		if (variables) {
			this.variables = variables
		}

		this.directOut = directOut
	}

	getToken() {
		if (this.tokenBuilder) {
			return this.tokenBuilder()
		}
		return Promise.reject('No token builder set for this Beam!')
	}

	//FETCH
	async fetch<value = any>(params: FetchRequestParams): Promise<value> {
		const newParams = this.preprocessor(params)

		return await createFetchRequest({
			method: newParams.method,
			endpoint: newParams.endpoint,
			body: newParams.body,
			headers: newParams.headers,
			customConfig: newParams.customConfig,
			tokenBuilder: this.tokenBuilder,
			urlPrefix: this.urlPrefix,
			fetchHandler: this.fetchHandler,
			directOut: this.directOut
		})
	}

	//GET
	async get<value = any>(endpoint: string, headers?: any): Promise<value> {
		return await this.fetch(this.preprocessor({
			method: 'GET',
			endpoint,
			headers
		}))
	}

	//POST
	async post<value = any>(endpoint: string, body?: any, headers?: any): Promise<value> {
		return await this.fetch(this.preprocessor({
			method: 'POST',
			endpoint,
			body,
			headers
		}))
	}

	//DELETE
	async del<value = any>(endpoint: string, body?: any, headers?: any): Promise<value> {
		return await this.fetch(this.preprocessor({
			method: 'DELETE',
			endpoint,
			body,
			headers
		}))
	}

	//PUT
	async put<value = any>(endpoint: string, body?: any, headers?: any): Promise<value> {
		return await this.fetch(this.preprocessor({
			method: 'PUT',
			endpoint,
			body,
			headers
		}))
	}

	//PATCH
	async patch<value = any>(endpoint: string, body?: any, headers?: any): Promise<value> {
		return await this.fetch(this.preprocessor({
			method: 'PATCH',
			endpoint,
			body,
			headers
		}))
	}
}

export default beamCreator