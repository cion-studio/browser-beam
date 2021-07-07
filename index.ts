import Beam from "./src/Beam";

//For creating a custom Beam object with tokenBuilder and urlPrefix
export default Beam

//For just using the request functions directly
export const {
	get, 
	put,
	patch,
	post, 
	del,
} = new Beam()