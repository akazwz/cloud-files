import React from 'react'
import { Box, Grid, GridProps, Text, Tooltip, } from '@chakra-ui/react'

import { FolderIcon } from '../icons/FolderIcon'
import { ImageIcon } from '../icons/ImageIcon'

export interface FileProps{
	type: string
	name: string
	size: number
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
		switch (file.type) {
			case 'folder':
				return <FolderCard name={file.name} />
			case 'image':
				return <ImageCard name={file.name} size={file.size} />
			default:
				return <></>
		}
	}

	return (
		<Content />
	)
}

const FolderCard = ({ name }: { name: string }) => {
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
			<FolderIcon fontSize="90" />
			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{filename}</Text>
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