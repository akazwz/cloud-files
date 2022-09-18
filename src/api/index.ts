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

export const GetPathApi = async(token: string, parentID: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/path`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
	})
}

export const GetFoldersAndFilesByParentIDApi = async(token: string, parentID: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/all`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
	})
}

export const GetFoldersByParentIDApi = async(token: string, parentID: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/folders`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
	})
}

export const GetFilesByParentIDApi = async(token: string, parentID: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/files`, {
		headers: {
			'Authorization': `Bearer ${token}`,
		},
	})
}

export const CreateFolderApi = async(token: string, parentID: string, folderName: string) => {
	return fetch(`${API_HOST}/folders/${parentID}/${folderName}`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
		},
	})
}