const API_HOST = 'http://localhost:8080'

export const LoginApi = async(data: { username: string, password: string }) => {
	return fetch(`${API_HOST}/auth/login`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const SignupApi = async(data: { username: string, password: string }) => {
	return fetch(`${API_HOST}/auth/signup`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const GetPathApi = async(parentID: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/path`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	})
}

export const GetFoldersAndFilesByParentIDApi = async(parentID: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/all`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	})
}

export const GetFoldersByParentIDApi = async(parentID: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/folders`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	})
}

export const GetFilesByParentIDApi = async(parentID: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/files`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	})
}

export const CreateFolderApi = async(parentID: string, folderName: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/${folderName}`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	})
}

export const DeleteFolderApi = async(id: string) => {
	return fetch(`${API_HOST}/folders/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	})
}

export const RenameFolderApi = async(id: string, name: string) => {
	return fetch(`${API_HOST}/folders/${id}/name/${name}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	})
}

interface CreateFileOrGetUploadUrlListProps{
	content_hash: string
	name: string
	size: number
	parent_id: string
	part_info_list: any[]
}

export const CreateFileOrGetUploadUrlList = async(data: CreateFileOrGetUploadUrlListProps) => {
	return fetch(`${API_HOST}/files`, {
		method: 'POST',
		body: JSON.stringify({
			content_hash: data.content_hash,
			name: data.name,
			size: data.size,
			parent_id: data.parent_id,
			part_info_list: data.part_info_list
		}),
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
			'Content-Type': 'application/json',
		},
	})
}

interface CompleteMultipartUploadProps{
	name: string
	size: number
	key: string
	upload_id: string
	content_hash: string
	parent_id: string
	part_count: number
}

export const CompleteMultipartUpload = async(data: CompleteMultipartUploadProps) => {
	return fetch(`${API_HOST}/files/complete`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
			'Content-Type': 'application/json',
		},
	})
}

export const DeleteFileApi = async(id: string) => {
	return fetch(`${API_HOST}/files/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	})
}

export const ProfileApi = async() => {
	return fetch(`${API_HOST}/auth/me`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	})
}