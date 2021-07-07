import {FetchRequestParams} from './interfaces'

async function createFetchRequest({ 
	method, 
	endpoint, 
	body, 
	headers, 
	customConfig, 
	tokenBuilder,
	urlPrefix = '', 
}: FetchRequestParams) {

	//if the url is a subURL (starts with /) append the base url automatically. Otherwise use it as is
	const baseURL = endpoint?.startsWith('/') ? urlPrefix : ''
	
	const fetchConfig = {
		headers: {
			'Content-Type': 'application/json',
			...headers
		},
		method,
		...customConfig,
	}

	if (tokenBuilder) {
		fetchConfig.headers.Authorization = await tokenBuilder()
	}

	if (body) {
		fetchConfig.body = JSON.stringify(body)
	}

	try {

		const response = await fetch(`${baseURL}${endpoint}`, fetchConfig)

		if (response.ok) {
			return {
				status: response.status,
				response: await response.json()
			}

		} else {

			const errorMessage = {
				status: response.status,
				request: { ...fetchConfig, endpoint },
				response: await response.json(),
			}

			console.log({ beamError: errorMessage })

			return Promise.reject(errorMessage)
		}

	} catch (err) {

		const errorMessage = {
			request: { ...fetchConfig, endpoint },
			response: { error: 'Network Error' }
		}

		console.log({ beamError: errorMessage })
		return Promise.reject(errorMessage)
	}

}

export default createFetchRequest
