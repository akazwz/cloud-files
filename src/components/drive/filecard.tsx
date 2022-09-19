import React from 'react'
import { Box, Grid, GridProps, Text, Tooltip, } from '@chakra-ui/react'

import { FolderIcon } from '../icons/FolderIcon'
import { ImageIcon } from '../icons/ImageIcon'
import { useNavigate } from 'react-router-dom'
import { OtherIcon } from '../icons/OtherIcon'

export interface FileProps{
	category: string
	name: string
	size: number
	starred: boolean
	thumbnail: string
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
				return <ImageCard name={file.name} size={file.size} />
			default:
				return <OtherCard name={file.name} size={file.size} />
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
	const navigate = useNavigate()

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
			onClick={() => navigate(`/drive/folders/${id}`)}
		>
			<FolderIcon fontSize="90" />
			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{folderName}</Text>
			</Tooltip>
			<Text mb="20px">{''}</Text>
		</Box>
	)
}

const ImageCard = ({ name, size }: { name: string, size: number }) => {
	const filename = name.length > 10 ? name.slice(0, 7) + '...' : name
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
		>
			<ImageIcon fontSize="90" />
			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{filename}</Text>
			</Tooltip>
			<Text fontWeight="300" fontSize="13px">{size}</Text>
		</Box>
	)
}

const OtherCard = ({ name, size }: { name: string, size: number }) => {
	const filename = name.length > 10 ? name.slice(0, 7) + '...' : name
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
		>
			<OtherIcon fontSize="90" />
			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{filename}</Text>
			</Tooltip>
			<Text fontWeight="300" fontSize="13px">{size}</Text>
		</Box>
	)
}