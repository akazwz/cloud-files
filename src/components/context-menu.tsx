import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

interface ContextMenuProps{
	isOpen: boolean
	onClose: () => void
	offset: [number, number]
}

export const ContextMenu = ({ isOpen, onClose, offset }: ContextMenuProps) => {
	return (
		<>
			<Menu isOpen={isOpen} onClose={onClose} offset={offset}>
				<MenuButton position="absolute" top={0} left={0} />
				<MenuList>
					<MenuItem>Hello</MenuItem>
					<MenuItem>Hello</MenuItem>
					<MenuItem>Hello</MenuItem>
				</MenuList>
			</Menu>
		</>
	)
}