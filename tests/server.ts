import beamCreator from '../src/beamCreator'
import fetchHandler from 'node-fetch'

const Beam = beamCreator(fetchHandler)

const beam = new Beam({
	directOut: true,
	preprocessor: (params) => ({
		...params,
		endpoint: 'https://api.kanye.rest/',
	})
})

beam.configure({
	directOut: true,
})

interface Tweet{
	quote: string
}

beam.get<Tweet>('twitter.com').then((d)=>{
	console.log(d)
}).catch(console.error)
