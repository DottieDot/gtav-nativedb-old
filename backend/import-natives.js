const fetch = require('node-fetch')
const mysql = require('mysql2')
const fs = require('fs')

const connection = mysql.createConnection({
  host:     'localhost',
  user:     'root',
  database: 'nativedb'
});

const exec = async (query, params = []) => {
	return new Promise((resolve, reject) => {
		connection.execute(query, params, (error, result, meta) => {
			if (error) {
				reject(error)
			}
			resolve(result)
		})
	})
}

const importNatives = async(url) => {
	const response = await fetch('https://raw.githubusercontent.com/UnknownModder/gta5-nativedb-data/master/natives.json')
	const data = await response.json()

	for (const nsname in data) {
		//if (nsname !== 'SYSTEM') return

		const namespace = data[nsname]
		try {
			await exec('INSERT INTO namespaces (name) VALUES(?)', [nsname])
		}
		catch {}

		for (const hash in namespace) {
			const native = namespace[hash]
			try {
				await exec(
					'INSERT INTO natives (namespace_id, hash, jhash, name, build, return_type) VALUES ((SELECT id FROM namespaces WHERE name = ?), ?, ?, ?, ?, ?)',
					[ nsname, hash, native.jhash, native.name, native.build, native.return_type ]
				)

				for (const param of native.params) {
					try {
						await exec(
							'INSERT INTO params (native_id, type, name) VALUES ((SELECT id FROM natives WHERE hash = ?), ?, ?)',
							[ hash, param.type, param.name ]
						)
					}
					catch {}
				}
			}
			catch {}
		}
  }
  
  console.log('DONE')
}
importNatives()

const importDescriptions = async() => {
	const response = await fetch('https://raw.githubusercontent.com/UnknownModder/gta5-nativedb-data/master/natives.json')
	const data = await response.json()

	for (const nsname in data) {
		const namespace = data[nsname]

		if (!fs.existsSync(`./descriptions/${nsname}/`)) {
			fs.mkdirSync(`./descriptions/${nsname}/`)
		}

		for (const hash in namespace) {
			const native = namespace[hash]

			if (!fs.existsSync(`./descriptions/${nsname}/${hash}.md`)) {
				fs.writeFileSync(`./descriptions/${nsname}/${hash}.md`, native.comment)
			}
		}
	}
}
//importDescriptions()
