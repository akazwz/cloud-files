import React, { MouseEvent, useState } from 'react'
import {
	Box,
	Grid,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
	useColorModeValue,
	useDisclosure,
	Portal,
	useToast,
	GridProps,
} from '@chakra-ui/react'
import { Delete, Edit, Info } from '@icon-park/react'

import { FolderIcon } from '../icons/FolderIcon'
import { useLocation, useNavigate } from 'react-router-dom'
import { DeleteFolderApi } from '../../api'

import RenameFolderModal from './rename-folder-modal'

import OtherCard from './other-card'
import ImageCard from './image-card'
import VideoCard from './video-card'

export interface FileProps{
	id: string
	category: string
	name: string
	size: number
	starred: boolean
	thumbnail: string
	url: string
}

export const FileGrid = (props: GridProps) => {
	return (
		<Grid
			boxSizing="border-box"
			gridTemplateColumns="repeat(auto-fill, 9rem)"
			justifyContent="space-between"
			alignItems="flex-end"
			{...props}
		/>
	)
}

export const FileCard = (file: FileProps) => {
	const Content = () => {
		switch (file.category) {
			case 'image':
				return <ImageCard data={file} />
			case 'video':
				return <VideoCard data={file} />
			default:
				return <OtherCard data={file} />
		}
	}

	return (
		<Content />
	)
}

export interface FolderProps{
	name: string,
	id: string
}

export const FolderCard = ({ name, id }: FolderProps) => {
	const folderName = name.length > 10 ? name.slice(0, 7) + '...' : name
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: renameIsOpen, onOpen: renameOnOpen, onClose: renameOnClose } = useDisclosure()
	const toast = useToast()
	const [pos, setPos] = useState<[number, number]>([0, 0])

	const location = useLocation()
	const navigate = useNavigate()

	const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		setPos([e.pageX, e.pageY])
		onOpen()
	}

	const handleDelete = async() => {
		try {
			const res = await DeleteFolderApi(id)
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
		} catch (e) {
			toast({
				title: 'Error',
				status: 'error',
				isClosable: true,
			})
		} finally {
			navigate(location.pathname, { replace: true })
		}
	}

	const handleRename = () => {
		renameOnOpen()
	}

	return (
		<Box
			width="8.7rem"
			p={3}
			m={3}
			borderWidth={1}
			rounded="lg"
			mx="auto"
			overflow="hidden"
			textAlign="center"
			onClick={() => {
				if (!isOpen) {
					navigate(`/drive/folders/${id}`)
				}
			}}
			onContextMenu={handleContextMenu}
		>
			<FolderIcon fontSize="90" />
			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{folderName}</Text>
			</Tooltip>
			<Text mb="20px">{''}</Text>
			<Portal>
				<Menu isOpen={isOpen} onClose={onClose}>
					<MenuButton position="absolute" left={pos[0]} top={pos[1]} cursor="default" />
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
						<MenuItem
							rounded="md"
							icon={<Delete />}
							color="red.500"
							onClick={handleDelete}
						>
							<Box fontSize="14px" fontWeight="400">
								Delete
							</Box>
						</MenuItem>
						<MenuItem
							rounded="md"
							icon={<Edit />}
							onClick={handleRename}
						>
							<Box fontSize="14px" fontWeight="400">
								Rename
							</Box>
						</MenuItem>
						<MenuItem
							rounded="md"
							icon={<Info />}
						>
							<Box fontSize="14px" fontWeight="400">
								Info
							</Box>
						</MenuItem>
					</MenuList>
				</Menu>
			</Portal>
			<RenameFolderModal isOpen={renameIsOpen} onClose={renameOnClose} id={id} originName={name} />
		</Box>
	)
}



