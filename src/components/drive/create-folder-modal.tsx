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
import { useLoaderData, useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { useState } from 'react'

import { FolderIcon } from '../icons/FolderIcon'
import { CreateFolderApi } from '../../api'

interface InterfaceCreatFolderModal{
	isOpen: boolean
	onClose: () => void
}

const CreateFolderModal = (props: InterfaceCreatFolderModal) => {
	const [folderName, setFolderName] = useState('')
	const [loading, setLoading] = useState(false)
	const toast = useToast()

	const { parentID } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const handleCreateFolder = async() => {
		setLoading(true)
		try {
			const res = await CreateFolderApi(parentID || 'root', folderName)
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