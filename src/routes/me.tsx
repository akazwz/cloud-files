import { LoaderFunction, useLoaderData } from 'react-router-dom'

import { ProfileApi } from '../api'

export const loader: LoaderFunction = async() => {
	const res = await ProfileApi()
	const json = await res.json()
	return {
		data: json.data
	}
}

const Me = () => {
	// @ts-ignore
	const { data } = useLoaderData()
	// @ts-ignore
	const { capacity, user } = data
	return (
		<>
			{JSON.stringify(user, null, 2)}
			{JSON.stringify(capacity, null, 2)}
		</>
	)
}

export default Me