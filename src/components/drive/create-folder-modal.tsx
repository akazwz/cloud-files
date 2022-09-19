import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Input,
	Center,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'

import { FolderIcon } from '../icons/FolderIcon'
import { useState } from 'react'
import { CreateFolderApi } from '../../api'
import useAuth from '../../hooks/useAuth'

interface InterfaceCreatFolderModal{
	isOpen: boolean
	onClose: () => void
}

const CreateFolderModal = (props: InterfaceCreatFolderModal) => {
	const [folderName, setFolderName] = useState('')
	const [loading, setLoading] = useState(false)
	const { loading: authLoading, token } = useAuth()
	const toast = useToast()
	const handleCreateFolder = async() => {
		if (authLoading) return
		if (!token) return
		setLoading(true)
		try {
			const res = await CreateFolderApi(token, 'root', folderName)
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
		} catch (e: any) {
			toast({
				title: 'Error',
				status: 'error',
				isClosable: true,
			})
		} finally {
			setLoading(false)
		}
	}
	return (
		<>
			<Modal isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent bg={useColorModeValue('white', 'black')}>
					<ModalHeader>New Folder</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Center p={10}>
							<FolderIcon fontSize="100" />
						</Center>
						<Input
							w="full"
							placeholder={'Folder Name'}
							fontSize="14px"
							autoFocus
							value={folderName}
							onInput={(e) => setFolderName(e.currentTarget.value)}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							size="sm"
							fontSize="14px"
							colorScheme="blue"
							isLoading={loading}
							onClick={handleCreateFolder}
						>
							OK
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default CreateFolderModal