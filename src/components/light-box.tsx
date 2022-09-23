import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface LightBoxProps{
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

const LightBox = ({ isOpen, onClose, children }: LightBoxProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="full">
			<ModalOverlay />
			<ModalContent bg={useColorModeValue('white', 'black')}>
				<ModalCloseButton />
				<ModalBody>
					{children}
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default LightBox