
export default class ApiWrapper {
	static async getNamespaces() {
		const response = await fetch('http://localhost:3001/namespace')
		const data = await response.json()

		return data
	}

	static async getNamespace(namespace) {
		const response = await fetch(`http://localhost:3001/namespace/${namespace}`)
		const data = await response.json()

		return data
	}

	static async getNative(native) {
		const response = await fetch(`http://localhost:3001/native/${native}`)
		const data = await response.json()

		return data
	}

	static async downloadNatives(useTypedefs, usePascalCase, exportHashes, exportComments) {
		const params = new URLSearchParams({
			useTypedefs:    useTypedefs,
			usePascalCase:  usePascalCase,
			exportHashes:   exportHashes,
			exportComments: exportComments
		})
		const response = await fetch(`http://localhost:3001/download?${params}`)
		const data = await response.text()

		return data
	}
}
