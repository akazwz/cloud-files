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
} from '@chakra-ui/react'

import { FolderIcon } from '../icons/FolderIcon'

interface InterfaceCreatFolderModal{
	isOpen: boolean
	onClose: () => void
}

const CreateFolderModal = (props: InterfaceCreatFolderModal) => {
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
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							size="sm"
							fontSize="14px"
							colorScheme="blue"
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