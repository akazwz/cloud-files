import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	Text,
	useColorModeValue, useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { PreviewClose, PreviewOpen } from '@icon-park/react'
import { SignupApi } from '../api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const toast = useToast()
	const navigate = useNavigate()

	const handleSignup = async() => {
		setLoading(true)
		try {
			const res = await SignupApi({ username, password })
			if (!res.ok) {
				toast({
					title: 'Error',
					status: 'error',
					isClosable: true,
				})
				return
			}
			toast({
				title: 'Success',
				status: 'success',
				isClosable: true,
			})
			navigate('/login')
		} catch (e: any) {
			toast({
				title: e.message,
				status: 'error',
				isClosable: true,
			})
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
						<Heading fontSize={'4xl'}>Sign Up</Heading>
						<Text>Have account ? <Link color="blue.400" href="/login">Login</Link></Text>
					</Stack>
					<Box
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={8}>
						<Stack spacing={4}>
							<FormControl id="email" isRequired>
								<FormLabel>Username</FormLabel>
								<Input value={username} onInput={(e) => setUsername(e.currentTarget.value)} />
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? 'text' : 'password'}
										value={password}
										onInput={(e) => setPassword(e.currentTarget.value)}
									/>
									<InputRightElement h="full">
										<IconButton
											variant="ghost"
											icon={showPassword ? <PreviewClose /> : <PreviewOpen />}
											aria-label={'password'}
											onClick={() => setShowPassword(showPassword => !showPassword)}
										/>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10}>
								<Button
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									onClick={handleSignup}
								>
									Sign Up
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