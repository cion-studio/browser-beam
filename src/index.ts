import beamCreator from './beamCreator'

//For creating a custom Beam object with tokenBuilder and urlPrefix
export default beamCreator(fetch)
export beamCreator

//For just using the request functions directly
const BeamClass = beamCreator(fetch)

export const {
	get,
	put,
	patch,
	post,
	del,
} = new BeamClass()
