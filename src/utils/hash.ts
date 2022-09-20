type Algo = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'

export const hashFile = async(algo: Algo, ab: ArrayBuffer): Promise<string> => {
	const hashBuffer = await crypto.subtle.digest(algo, ab)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}