import {
	Flex,
	IconButton,
	Box,
	Menu,
	MenuButton,
	MenuList,
	MenuGroup,
	MenuItem,
	HStack,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Spacer,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Input,
	ModalFooter,
	Button,
	useColorModeValue,
	useDisclosure,
	FlexProps,
} from '@chakra-ui/react'
import { FolderPlus, HamburgerButton, UploadOne } from '@icon-park/react'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'

import CreateFolderModal from '../../components/drive/create-folder-modal'
import { useEffect, useState } from 'react'
import { GetPathApi } from '../../api'
import useAuth from '../../hooks/useAuth'

interface HeaderProps extends FlexProps{
	onOpen: () => void
	mini: boolean
}

const SearchButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<IconButton
				aria-label={'search'}
				icon={<SearchIcon />}
				variant="ghost"
				rounded="full"
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg={useColorModeValue('white', 'black')}>
					<ModalHeader>Search</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							w="full"
							placeholder={'Search'}
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

const AddMenu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Menu>
				<MenuButton
					aria-label={'Add'}
					display="flex"
					rounded="full"
					size="sm"
					colorScheme="blue"
					icon={<AddIcon />}
					as={IconButton}
				/>
				<MenuList
					display="flex"
					flexDirection="column"
					alignContent="flex-start"
					minW="167px"
					bg={useColorModeValue('white', 'rgb(49, 49, 54)')}
					border="none"
					pl="5px"
					pr="5px"
				>
					<MenuGroup title="File" fontSize="12px" fontWeight="500">
						<MenuItem icon={<UploadOne />} rounded="md">
							<Box fontSize="14px" fontWeight="400">
								Upload
							</Box>
						</MenuItem>
						<MenuItem icon={<FolderPlus />} rounded="md" onClick={onOpen}>
							<Box fontSize="14px" fontWeight="400">
								New Folder
							</Box>
						</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>
			<CreateFolderModal isOpen={isOpen} onClose={onClose} />
		</>
	)
}

interface Folder{
	name: string
	id: string
}

const FolderBreadCrumb = () => {
	const [folders, setFolders] = useState<Folder[]>([])

	const { token, loading } = useAuth()

	useEffect(() => {
		if (loading) return
		if (!token) return
		GetPathApi(token, 'root')
			.then((res) => {
				if (!res.ok) {
					return
				}
				res.json().then((data) => {
					const folders = data.data
					setFolders(folders)
				})
			})
			.catch((e: any) => {

			})
			.finally(() => {

			})
	}, [loading, token])

	return (
		<>
			<Breadcrumb>
				{folders.map((folder) => {
					return (
						<BreadcrumbItem key={`breadcrumb-${folder.id}`}>
							<BreadcrumbLink
								_hover={{ textDecoration: 'none' }}
								fontSize="md"
								fontWeight="bold"
							>
								{folder.name}
							</BreadcrumbLink>
						</BreadcrumbItem>
					)
				})}
			</Breadcrumb>
		</>
	)
}

export const DashHeader = ({ onOpen, mini, ...rest }: HeaderProps) => {
	return (
		<Flex
			ml={{ base: 0, md: mini ? 20 : 60 }}
			width="100%"
			height="6vh"
			px={3}
			position="fixed"
			alignItems="center"
			borderBottomWidth={1}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				aria-label={'open menu'}
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				icon={<HamburgerButton />}
			/>
			<HStack mr={{ base: 0, md: mini ? 20 : 60 }} flex={1} pl={3}>
				<FolderBreadCrumb />
				<Spacer />
				<SearchButton />
				<AddMenu />
			</HStack>
		</Flex>
	)
}