import { FetchRequestParams } from './types'

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' }

async function createFetchRequest<value = any>({
	method,
	endpoint,
	body,
	headers = DEFAULT_HEADERS,
	customConfig,
	tokenBuilder,
	urlPrefix = '',
	fetchHandler,
	directOut,
}: FetchRequestParams): Promise<value> {

	//if the url is a subURL (starts with /) append the base url automatically. Otherwise use it as is
	const isRelative = endpoint?.startsWith('/')
	const baseURL = isRelative ? urlPrefix : ''

	const fetchConfig = {
		headers,
		method,
		...customConfig,
	}

	if (tokenBuilder && isRelative) {
		fetchConfig.headers.Authorization = await tokenBuilder()
	}

	if (body) {
		fetchConfig.body = JSON.stringify(body)
	}

	try {

		const response = await fetchHandler(`${baseURL}${endpoint}`, fetchConfig)

		if (response.ok) {
			const parsed = await response.json()
			return directOut ? parsed : { status: response.status, response: parsed }

		} else {
			const contents = await response.json()
			const errorMessage = {
				status: response.status,
				request: { ...fetchConfig, endpoint },
				response: contents,
			}

			console.log({ beamError: errorMessage }) //eslint-disable-line no-console

			return directOut ? Promise.reject(contents) : Promise.reject(errorMessage)
		}

	} catch (err) {

		const errorMessage = {
			request: { ...fetchConfig, endpoint },
			response: { error: 'Network Error' }
		}

		console.log({ beamError: errorMessage }) //eslint-disable-line no-console
		return Promise.reject(errorMessage)
	}

}

export default createFetchRequest
