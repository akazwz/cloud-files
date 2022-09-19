import { Box } from '@chakra-ui/react'

import { FileGrid, FolderCard } from '../components/drive/filecard'
import useFolderList from '../hooks/useFolderList'

const Drive = () => {
	const { folders } = useFolderList()

	return (
		<Box>
			<FileGrid>
				{folders.map((folder, index) => (
					<FolderCard
						key={'folders-' + folder.id}
						name={folder.name}
						id={folder.id}
					/>
				))}
			</FileGrid>
		</Box>
	)
}

export default Drive