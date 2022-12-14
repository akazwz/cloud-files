import {
	Box, Flex,
	Image,
	Menu,
	MenuButton, MenuItem,
	MenuList, Portal,
	Text,
	Tooltip,
	useColorModeValue,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import React, { MouseEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DeleteFileApi } from '../../api'
import { FileProps } from './filecard'
import { Delete, Edit, Info } from '@icon-park/react'
import LightBox from '../light-box'
import { VideoIcon } from '../icons/VideoIcon'

const VideoCard = ({ data }: { data: FileProps }) => {
	const filename = data.name.length > 10 ? data.name.slice(0, 7) + '...' : data.name

	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: lightBoxIsOpen, onOpen: lightBoxOnOpen, onClose: lightBoxOnClose } = useDisclosure()
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
			const res = await DeleteFileApi(data.id)
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

	const handleOpenLightBox = () => {
		if (isOpen) return
		lightBoxOnOpen()
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
			onContextMenu={handleContextMenu}
			onClick={handleOpenLightBox}
		>
			<VideoIcon fontSize="90" />
			<Tooltip label={data.name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{filename}</Text>
			</Tooltip>
			<Text fontWeight="300" fontSize="13px">{data.size}</Text>
			<Portal>
				<LightBox isOpen={lightBoxIsOpen} onClose={lightBoxOnClose}>
					<Flex height="90vh" justifyContent="center" alignItems="center" p={10}>
						<video src={data.url} preload={data.url} controls style={{ width: '100%', height: '100%' }} />
					</Flex>
				</LightBox>
			</Portal>
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
		</Box>
	)
}

export default VideoCard