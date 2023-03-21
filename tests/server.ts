import beamCreator from '../src/beamCreator'
import fetchHandler from 'node-fetch'

const Beam = beamCreator(fetchHandler)

const beam = new Beam({

})

beam.configure({
	directOut: true,
	// preprocessor: (params) => ({
	// 	...params,
	// 	headers: { ...params.headers, orgId: 100 },
	// 	endpoint: 'https://api.kanye.rest/',
	// }),
	variables: {
		URL: 'https://api.kanye.rest/'
	}
})

interface Tweet {
	quote: string
}

beam.get<Tweet>(beam.variables.URL, {
	CONTENT_TYPE: 'image'
}).then(e => console.log(e))
	.catch(e => console.log(e))
