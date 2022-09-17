import { ReactNode, useState } from 'react'
import {
	Box,
	VStack,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	HStack,
	useColorModeValue,
	useDisclosure,
	Drawer,
} from '@chakra-ui/react'

import { NavLinks, DashSidebar } from './sidebar'
import { DashHeader } from './header'
import { ColorModeToggle } from '../../components/color-mode-toggle'
import { Outlet } from 'react-router-dom'

export const DashLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const drawerBgColor = useColorModeValue('white', 'black')
	const [mini, setMini] = useState(false)

	return (
		<Box minH="100vh">
			<DashSidebar
				onClose={onClose}
				mini={mini}
				setMini={setMini}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				size={'full'}
				placement={'left'}
			>
				<DrawerContent backgroundColor={drawerBgColor}>
					<DrawerHeader>
						<DrawerCloseButton />
					</DrawerHeader>
					<DrawerBody>
						<VStack>
							<HStack>
								<ColorModeToggle />
							</HStack>
							<NavLinks mini={false} />
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<DashHeader
				onOpen={onOpen}
				mini={mini}
			/>
			<Box as="main" ml={{ base: 0, md: mini ? 20 : 60 }} pt="6vh" px={3}>
				<Outlet />
			</Box>
		</Box>
	)
}

