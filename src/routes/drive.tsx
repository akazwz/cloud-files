import { Box, Flex } from '@chakra-ui/react'

import { FileCard, FileGrid, FileProps } from '../components/drive/filecard'

const Drive = () => {
	const fileList: FileProps[] = [
		{ type: 'folder', name: 'Hello', size: 100 },
		{ type: 'folder', name: 'Hello', size: 100 },
		{ type: 'folder', name: 'Hello', size: 100 },
		{ type: 'folder', name: 'Hello', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
		{ type: 'image', name: 'Dog.png', size: 100 },
	]

	return (
		<Box>
			<FileGrid>
				{fileList.map((file, index) => (
					<FileCard
						key={'file-card-' + index}
						name={file.name}
						size={file.size}
						type={file.type}
					/>
				))}
			</FileGrid>
		</Box>
	)
}

export default Drive