import * as Database from './Database'

class NotInitalizedError {
	constructor() {
		this.error = "Controller not initialized"
	} 
}

class InvalidNamespaceError {
	constructor() {
		this.error = "Namespace does not exist"
	}
}

class InvalidNativeError {
	constructor() {
		this.error = "Native hash does not exist"
	}
}

export default class Controller {
	static namespaces = []
	static natives = {}
	static comments = {}
	static Initialized = false

	static async Initialize() {
		this.Initialized = false

		const nsList = await Database.getNamespaces()
		
		for (const {name} of nsList) {
			const namespace = await Database.getNamespace(name)

			this.namespaces.push(namespace)

			for (const native of namespace.natives) {
				const { description } = await Database.getNative(native.hash)

				this.comments[native.hash] = description
				this.natives[native.hash] = native
			}
		}

		this.Initialized = true
	}

	static GetNamespaces() {
		if (!this.Initialized) return new NotInitalizedError()

		const result = []

		for (const namespace of this.namespaces) {
			result.push({ name: namespace.name })
		}

		return result
	}

	static GetNamespace(name) {
		if (!this.Initialized) return new NotInitalizedError()

		const namespace = this.namespaces.find(v => v.name === name)

		return namespace ? namespace : new InvalidNamespaceError()
	}

	static GetNative(hash) {
		if (!this.Initialized) return new NotInitalizedError()

		if (!this.natives.hasOwnProperty(hash))
			return new InvalidNativeError()

		const result = Object.assign({}, this.natives[hash])

		result.description = this.comments[result.hash]

		return result
	}
}
