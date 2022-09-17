import { Heading, Text, VStack } from '@chakra-ui/react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
	const error: any = useRouteError()
	return (
		<VStack spacing={3}>
			<Heading>Oops!</Heading>
			<Text as="b">Sorry, an unexpected error has occurred.</Text>
			<Text as="i">{error.statusText || error.message}</Text>
		</VStack>
	)
}

export default ErrorPage