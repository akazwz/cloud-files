import { Avatar, Box, HStack, Progress, Text, Center } from '@chakra-ui/react'
import { useRouteLoaderData } from 'react-router-dom'
import useProfile from '../hooks/useProfile'

interface SidebarFooterProps{
	mini: boolean
}

const User = ({ mini }: SidebarFooterProps) => {
	const { loading, capacity, user } = useProfile()
	if (loading) {
		return (
			<>
			</>
		)
	}
	// @ts-ignore
	const { total, used } = capacity
	// @ts-ignore
	const { username } = user
	return (
		<>
			{
				mini ? (
					<Center p={3}>
						<Avatar src={'https://cdn.pexni.com/profile.png'} size="sm" />
					</Center>
				) : (
					<>
						<Box>
							<Progress colorScheme="green" size="xs" value={(used / total) * 100} />
						</Box>
						<HStack p={3}>
							<Avatar src={'https://cdn.pexni.com/profile.png'} size="sm" />
							<Text>{username}</Text>
						</HStack>
					</>
				)
			}
		</>
	)
}

export default User