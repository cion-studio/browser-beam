# Beam by Cion Studio

Lightweight wrapper around the browser's fetch API. Can be configured to automatically assemble full URLs and attach authorization tokens.

## Requirements

- npm and NodeJS
  - Download and Install nodeJs
    - [https://nodejs.org/en/](https://nodejs.org/en/)

## Usage in the browser

You can configure Beam to use a default base URL. Any request starting with a
"/" will have the base URL appended to it.

You can also configure Beam to use a JWT with every request by providing a token builder function.
The example below uses a firebase auth JWT.

The JWT will only be sent to relative routes that start with your set base url (ie. calls starting with '/')
Any absolute calls (where you specify the full url) will exclude the JWT to avoid leaking your auth credentials to outside sources.

```
// configuredBeam.ts

import firebase from 'firebase/app'
import 'firebase/auth'
import Beam from 'browser-beam'

async function tokenBuilder(): Promise<string> {
	const token = await firebase.auth().currentUser?.getIdToken().catch(() => '')
	return token || ''
}

const beam = new Beam({
	tokenBuilder: tokenBuilder,
	urlPrefix: 'localhost:5000',
	directOut: true
})

export default beam
```

## Direct out mode

If this is set to true, then beam will always return the exact response received from the api (instead of an object {request, response})

```
// configuredBeam.ts

import firebase from 'firebase/app'
import 'firebase/auth'
import Beam from 'browser-beam'

async function tokenBuilder(): Promise<string> {
	const token = await firebase.auth().currentUser?.getIdToken().catch(() => '')
	return token || ''
}

const beam = new Beam({
	tokenBuilder: tokenBuilder,
	urlPrefix: 'localhost:5000'
})

export default beam
```

## Request Preprocessor

You can add a middleware function that transforms requests before they go out

```
const beam = new Beam({
	directOut: true,
	preprocessor: (params) => ({
		...params,
		headers: { ...params.headers, orgId: 100 },
		endpoint: 'https://api.kanye.rest/',
	})
})
```

## Generic types support

You can specify the return type of any beam call like the example below

```
interface Tweet{
	quote: string
}

beam.get<Tweet>('https://api.kanye.rest/').then((d)=>{
	console.log(d.quote.toUpperCase())
})
```

Note that by passing the parameter Tweet, we're setting the return type to Promise\<Tweet\>. You don't need to specify Promise, it is implied.

## Usage with Node

Since Node doesn't have a native fetch object, we have to provide one. You can use
node-fetch for this.

`npm i node-fetch`

Now we create a custom Beam class that uses this dependency.

```
import beamCreator from 'browser-beam/beamCreator'
import fetchHandler from 'node-fetch'

const Beam = beamCreator(fetchHandler)

const beam = new Beam()

beam.get('https://api.kanye.rest/').then(console.log).catch(console.error)
```
