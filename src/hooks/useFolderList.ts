import { useEffect, useState } from 'react'
import { FolderProps } from '../components/drive/filecard'
import { GetFoldersByParentIDApi } from '../api'
import useAuth from './useAuth'

const useFolderList = () => {
	const [folders, setFolders] = useState<FolderProps[]>([])
	const { token, loading: authLoading } = useAuth()
	useEffect(() => {
		if (authLoading) return
		if (!token) return
		GetFoldersByParentIDApi(token, 'root')
			.then((res) => {
				if (!res.ok) return
				res.json().then((data) => {
					setFolders(data.data)
				})
			})
			.catch(() => {

			})
	}, [authLoading, token])
	return {
		folders
	}
}

export default useFolderList