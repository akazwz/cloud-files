import { useEffect, useState } from 'react'

const useAuth = () => {
	const [token, setToken] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const localToken = localStorage.getItem('token')
		if (localToken) {
			setToken(localToken)
		}
		setLoading(false)
	}, [])

	const setLogin = (token: string) => {
		console.log(token)
		localStorage.setItem('token', token)
		setToken(token)
	}

	const setLogout = () => {
		setToken(null)
		localStorage.removeItem('token')
	}

	return {
		loading,
		token,
		auth: !!token,
		setLogin,
		setLogout,
	}
}

export default useAuth