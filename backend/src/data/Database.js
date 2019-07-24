import mysql from 'mysql2'
import fs from 'fs'
import path from 'path'

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

export const getNamespaces = async () => {
	const rows = await exec('SELECT name FROM namespaces ORDER BY id')
	const res = []

	for (const row of rows) {
		res.push({name: row.name})
	}

	return res
}

export const getNamespace = async (namespace) => {
	const rows = await exec(
		'SELECT n.id, n.name, n.hash, n.jhash, n.build, n.return_type, namespaces.name AS nsname ' + 
		'FROM natives n ' + 
		'INNER JOIN namespaces ' +
			'ON namespaces.id = n.namespace_id ' +
		'WHERE namespaces.name = ? ',
		[namespace]
	)
	const res = []

	for (const row of rows) {
		res.push({
			name:         row.name,
			hash:         row.hash,
			jhash:        row.jhash,
			build:        row.build,
			namespace:    row.nsname,
			return_type:  row.return_type,
			params:       await getParams(row.id),
		})
	}

	return {
		name: namespace,
		natives: res
	}
}

const getParams = async(native_id) => {
	const rows = await exec('SELECT type, name FROM params WHERE native_id = ?', [native_id])
	const res = []

	for (const row of rows) {
		res.push({
			name: row.name,
			type: row.type,
		})
	}

	return res
}

export const getNative = async(native) => {
	const rows = await exec('SELECT n.id, n.name, n.hash, n.jhash, n.build, n.return_type, namespaces.name AS nsname FROM natives n INNER JOIN namespaces ON namespaces.id = n.namespace_id WHERE hash = ?', [native])
	const row = rows[0]
	
	return new Promise((resolve, reject) => {
		fs.readFile(path.join(__dirname, `../../descriptions/${row.nsname}/${native}.md`), {encoding: 'utf-8'}, async(error, data) => {
			if (error) {
				throw error
			}

			resolve({
				name:         row.name,
				hash:         row.hash,
				jhash:        row.jhash,
				build:        row.build,
				description:  data,
				return_type:  row.return_type,
				namespace:    row.nsname,
				params:       await getParams(row.id),
			})
		})
	})
}
