import {FetchRequestParams} from './interfaces'

async function createFetchRequest({ 
	method, 
	endpoint, 
	body, 
	headers, 
	customConfig, 
	tokenBuilder,
	urlPrefix = '', 
	fetchHandler,
	directOut,
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

		const response = await fetchHandler(`${baseURL}${endpoint}`, fetchConfig)

		if (response.ok) {
			return response.json()

		} else {

			const errorMessage = await response.json()
			console.log({ beamError: errorMessage })

			return Promise.reject(errorMessage)
		}

	} catch (err) {

		const errorMessage =  { error: 'Network Error' }

		console.log({ beamError: errorMessage })
		return Promise.reject(errorMessage)
	}

}

export default createFetchRequest
