import beamCreator from '../src/beamCreator'
import fetchHandler from 'node-fetch'

const Beam = beamCreator(fetchHandler)

const beam = new Beam({
	directOut: true
})

interface Tweet{
	quote: string
}

beam.get<Tweet>('https://api.kanye.rest/').then((d)=>{
	console.log(d.quote.toUpperCase())
}).catch(console.error)

