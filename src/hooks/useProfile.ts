import { useEffect, useState } from 'react'
import { ProfileApi } from '../api'

const useProfile = () => {
	const [user, setUser] = useState()
	const [capacity, setCapacity] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getData = async() => {
			const res = await ProfileApi()
			const json = await res.json()
			const { user, capacity } = json.data
			setUser(user)
			setCapacity(capacity)
		}
		getData().then().finally(() => setLoading(false))
	}, [])

	return {
		loading,
		user,
		capacity,
	}
}

export default useProfile