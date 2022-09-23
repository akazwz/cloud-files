import { Box } from '@chakra-ui/react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'

import { FileCard, FileGrid, FolderCard } from '../components/drive/filecard'
import { GetFoldersAndFilesByParentIDApi, GetPathApi } from '../api'

export const loader: LoaderFunction = async({ params }) => {
	const parentID = params.parentID || 'root'
	try {
		const resFolders = await GetFoldersAndFilesByParentIDApi(parentID)
		const jsonFolders = await resFolders.json()
		const { files, folders } = jsonFolders.data

		const resPath = await GetPathApi(parentID)
		const jsonPath = await resPath.json()
		const path = jsonPath.data

		return {
			folders,
			files,
			path,
		}
	} catch (e) {
		return {
			folders: [],
			files: [],
			path: [],
		}
	}
}

const Drive = () => {
	// @ts-ignore
	const { folders, files } = useLoaderData()

	return (
		<Box>
			<FileGrid>
				{/*@ts-ignore*/}
				{folders.map((folder) => (
					<FolderCard
						key={'folders-' + folder.id}
						name={folder.name}
						id={folder.id}
					/>
				))}
				{/*@ts-ignore*/}
				{files.map((file) => (
					<FileCard
						id={file.id}
						key={'files-' + file.id}
						name={file.name}
						size={file.size}
						url={file.url}
						category={file.category}
						starred={false}
						thumbnail={''}
					/>
				))}
			</FileGrid>
		</Box>
	)
}

export default Drive