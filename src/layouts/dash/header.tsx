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
	FlexProps, useToast,
} from '@chakra-ui/react'
import { ChangeEvent, useRef } from 'react'
import { Link, useParams, useRouteLoaderData } from 'react-router-dom'
import { FolderPlus, HamburgerButton, UploadOne } from '@icon-park/react'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'

import CreateFolderModal from '../../components/drive/create-folder-modal'
import { CreateFileApi, } from '../../api'
import { HashFile } from '../../utils/file'

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
				<ModalContent bg={useColorModeValue('white', 'black')} borderWidth={1}>
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
	const fileInputRef = useRef<HTMLInputElement>(null)

	const { parentID } = useParams()

	const handleUpload = () => {
		if (!fileInputRef.current) return
		fileInputRef.current.click()
	}

	const toast = useToast()

	const handleInputOnChange = async(event: ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget) return
		if (!event.currentTarget.files) return
		const file = event.currentTarget.files.item(0)
		if (!file) return
		try {
			const hash = await HashFile(file, 'sha256')
			toast({
				title: hash,
			})
			const res = await CreateFileApi(file, parentID || 'root')
			const json = await res.json()
			console.log(json)
		} catch (e: any) {
			console.log(e.message)
		}
	}

	return (
		<Box>
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
						<MenuItem icon={<UploadOne />} rounded="md" onClick={handleUpload}>
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
			<input
				ref={fileInputRef}
				hidden
				type="file"
				multiple={false}
				onChange={handleInputOnChange}
			/>
		</Box>
	)
}

const FolderBreadCrumb = () => {
	// @ts-ignore
	const { path } = useRouteLoaderData('folders')

	return (
		<>
			<Breadcrumb>
				{/*@ts-ignore*/}
				{path.map((folder) => {
					return (
						<BreadcrumbItem key={`breadcrumb-${folder.id}`}>
							<BreadcrumbLink
								as={Link}
								_hover={{ textDecoration: 'none' }}
								fontSize="md"
								fontWeight="bold"
								to={`/drive/folders/${folder.id}`}
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