import beamCreator from '../src/beamCreator'
import fetchHandler from 'node-fetch'

const Beam = beamCreator(fetchHandler)

const beam = new Beam({
	directOut: true
})

beam.get('https://api.kanye.rest/').then(console.log).catch(console.error)
