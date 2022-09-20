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
	useToast, Heading, Text, VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

import { FolderIcon } from '../icons/FolderIcon'
import { RenameFolderApi } from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'

interface InterfaceCreatFolderModal{
	isOpen: boolean
	onClose: () => void
	id: string
	originName: string
}

const RenameFolderModal = (props: InterfaceCreatFolderModal) => {
	const [folderName, setFolderName] = useState('')
	const [loading, setLoading] = useState(false)
	const toast = useToast()

	const location = useLocation()
	const navigate = useNavigate()

	const handleRenameFolder = async() => {
		setLoading(true)
		try {
			const res = await RenameFolderApi(props.id, folderName)
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
			navigate(location.pathname, { replace: true })
		}
	}
	
	return (
		<>
			<Modal isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent bg={useColorModeValue('white', 'black')} borderWidth={1}>
					<ModalHeader>Rename Folder</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack p={10}>
							<FolderIcon fontSize="100" />
							<Text fontWeight="bold">{props.originName}</Text>
						</VStack>
						<Input
							w="full"
							placeholder={'New Name'}
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
							onClick={handleRenameFolder}
						>
							OK
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default RenameFolderModal