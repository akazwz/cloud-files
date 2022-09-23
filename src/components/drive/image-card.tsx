import { Box, Image, Text, Tooltip } from '@chakra-ui/react'
import { ImageIcon } from '../icons/ImageIcon'
import React from 'react'

const ImageCard = ({ name, size, url }: { name: string, size: number, url: string }) => {
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
			<Image
				src={url}
				maxHeight="90"
				mx="auto"
				rounded="md"
				fallback={<ImageIcon fontSize="90" />}
			/>

			<Tooltip label={name}>
				<Text fontWeight="500" whiteSpace="nowrap" maxWidth="100px">{filename}</Text>
			</Tooltip>
			<Text fontWeight="300" fontSize="13px">{size}</Text>
		</Box>
	)
}

export default ImageCard