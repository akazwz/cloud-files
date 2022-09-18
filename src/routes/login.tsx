import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue, useToast
} from '@chakra-ui/react'

import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { LoginApi } from '../api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [loading, setLoading] = useState(false)
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const { setLogin } = useAuth()
	const navigate = useNavigate()
	const toast = useToast()

	const handleLogin = async() => {
		setLoading(true)
		try {
			const res = await LoginApi({ username, password })
			if (!res.ok) {
				toast({
					title: 'Error',
					status: 'error',
					isClosable: true,
				})
				return
			}
			const json = await res.json()
			const { token } = json.data
			setLogin(token)
			toast({
				title: 'Success',
				status: 'success',
				isClosable: true,
			})
			navigate('/drive')
		} catch (e: any) {
			toast({
				title: e.message,
				status: 'error',
				isClosable: true,
			})
			return
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Flex
				minH={'100vh'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('gray.50', 'gray.800')}>
				<Stack spacing={8} mx={'auto'} w={'md'} py={12} px={6}>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'}>Sign In</Heading>
						<Text>Dont have account ? <Link color="blue.400" href="/signup">Signup</Link></Text>
					</Stack>
					<Box
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={8}>
						<Stack spacing={4}>
							<FormControl id="email">
								<FormLabel>Username</FormLabel>
								<Input value={username} onInput={(e) => setUsername(e.currentTarget.value)} />
							</FormControl>
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input type="password" value={password} onInput={(e) => setPassword(e.currentTarget.value)} />
							</FormControl>
							<Stack spacing={10}>
								<Stack
									direction={{ base: 'column', sm: 'row' }}
									align={'start'}
									justify={'space-between'}>
									<Checkbox>Remember me</Checkbox>
									<Link color={'blue.400'} href="/password-reset">Forgot password?</Link>
								</Stack>
								<Button
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									isLoading={loading}
									onClick={handleLogin}
								>
									Sign in
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Flex>
		</>
	)
}

export default Login