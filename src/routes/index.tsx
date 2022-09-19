import { Flex, Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'

const Index = () => {
	const navigate = useNavigate()
	const { loading, auth } = useAuth()
	useEffect(() => {
		if (loading) return
		if (!auth) {
			navigate('/login')
		} else {
			navigate('/drive/folders/root')
		}
	}, [loading])
	return (
		<Flex h="80vh" alignItems="center" justifyContent="center">
			<Spinner />
		</Flex>
	)
}

export default Index