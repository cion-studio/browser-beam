import createFetchRequest from './createFetchRequest'
import { BeamConfigParams, FetchRequestParams, RequestResponse } from './interfaces'


const beamCreator = (fetchHandler: any) => class Beam {
	tokenBuilder?
	urlPrefix?
	fetchHandler?
	directOut?:Boolean

	constructor({ tokenBuilder, urlPrefix, directOut }: BeamConfigParams = {}) {
		this.tokenBuilder = tokenBuilder
		this.urlPrefix = urlPrefix ? urlPrefix : ''
		this.fetchHandler = fetchHandler
		this.directOut = directOut
	}

	//Set options
	configure({ tokenBuilder, urlPrefix, directOut }: BeamConfigParams) {
		if (tokenBuilder) {
			this.tokenBuilder = tokenBuilder
		}

		if (urlPrefix) {
			this.urlPrefix = urlPrefix
		}
		
		this.directOut = directOut
	}
	
	getToken(){
		if(this.tokenBuilder){
			return this.tokenBuilder()
		}
		return Promise.reject('No token builder set for this Beam!')
	}

	//FETCH
	async fetch({
		method,
		endpoint,
		body,
		headers,
		customConfig
	}: FetchRequestParams) {
		return await createFetchRequest({
			method,
			endpoint,
			body,
			headers,
			customConfig,
			tokenBuilder: this.tokenBuilder,
			urlPrefix: this.urlPrefix,
			fetchHandler: this.fetchHandler,
			directOut: this.directOut
		})
	}

	//GET
	async get(endpoint: string, headers?: any): Promise<RequestResponse> {
		return await this.fetch({
			method: 'GET',
			endpoint,
			headers
		})
	}

	//POST
	async post(endpoint: string, body?: any, headers?: any): Promise<RequestResponse> {
		return await this.fetch({
			method: 'POST',
			endpoint,
			body,
			headers
		})
	}

	//DELETE
	async del(endpoint: string, body?: any, headers?: any): Promise<RequestResponse> {
		return await this.fetch({
			method: 'DELETE',
			endpoint,
			body,
			headers
		})
	}

	//PUT
	async put(endpoint: string, body?: any, headers?: any): Promise<RequestResponse> {
		return await this.fetch({
			method: 'PUT',
			endpoint,
			body,
			headers
		})
	}

	//PATCH
	async patch(endpoint: string, body?: any, headers?: any): Promise<RequestResponse> {
		return await this.fetch({
			method: 'PATCH',
			endpoint,
			body,
			headers
		})
	}
}

export default beamCreator