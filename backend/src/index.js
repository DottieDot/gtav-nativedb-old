import Controller from './data/Controller'
const app = require('express')()

const snakeCaseToPascalCaes = (snake_case) => {
	return snake_case
		.toLowerCase()
		.replace(
				/(^\w|_\w)/g, 
				v => v[v.length - 1].toUpperCase()
		)
}

const createCommentString = (comment) => {
	const lines = comment.split(/[\r\n]+/g)
	const res = []

	//res.push('\t/*')
	for (const line of lines) {
		res.push(`\t// ${line}`)
	}
	//res.push('\t */')

	return res.join('\r\n')
}

const typeTranslations = {
	'Any'       : 'long long',
	'Entity'    : 'int',
	'Ped'       : 'int',
	'Vehicle'   : 'int',
	'Blip'      : 'int',
	'Hash'      : 'unsigned int',
	'Object'    : 'int',
	'Player'    : 'int',
	'BOOL'      : 'bool',
	'ScrHandle' : 'int',
	'FireId'    : 'int',
	'Interior'  : 'interior',
	'Cam'       : 'int',
}
for (const key in typeTranslations) {
	typeTranslations[`${key}*`] = `${typeTranslations[key]}*`
}

const createNativeString = async(native, {useTypedefs, usePascalCase, exportHashes, exportComments}) => {
	let res = ''

	if (exportComments) {
		const fullNative = await Controller.GetNative(native.hash)

		if (fullNative.description) {
			res += `${await createCommentString(fullNative.description)}\r\n`
		}
	}

	let returnType = native.return_type
	if (!useTypedefs && typeTranslations.hasOwnProperty(returnType)) {
		returnType = typeTranslations[returnType]
	}

	const tmp = []
	for (const param of native.params) {
		let type = param.type

		if (!useTypedefs && typeTranslations.hasOwnProperty(type)) {
			type = typeTranslations[type]
		}

		tmp.push(`${type} ${param.name}`)
	}

	const name = usePascalCase ? snakeCaseToPascalCaes(native.name) : native.name
	res += `\t${returnType} ${name}(${tmp.join(', ')});`

	if (exportHashes) {
		res += ` // ${native.hash} ${native.jhash} b${native.build}`
	}

	if (exportComments) {
		res += '\r\n'
	}

	return res
}

const createHeaderFile = async(params) => {
	const namespaces = await Controller.GetNamespaces()
	const res = []

	for (const n in params) {
		params[n] = params[n] === 'true'
	}
	
	for (const namespace of namespaces) {
		const {natives} = await Controller.GetNamespace(namespace.name)

		const name = params.usePascalCase ? snakeCaseToPascalCaes(namespace.name) : namespace.name
		res.push(`namespace ${name}\r\n{`)
		for (const native of natives) {
			res.push(await createNativeString(native, params))
		}
		res.push(`} // ${namespace.name}\r\n`)
	}

	return res.join('\r\n')
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Init = async() => {
	await Controller.Initialize()

	app.get('/namespace', async(req, res) => res.send(await Controller.GetNamespaces()))

	app.get('/namespace/:namespace', async(req, res) => res.send(await Controller.GetNamespace(req.params.namespace)))

	app.get('/native/:native', async(req, res) => res.send(await Controller.GetNative(req.params.native)))

	app.get('/download', async({query}, res) => res.send(await createHeaderFile(query)))

	app.listen(3001)
}

Init()
