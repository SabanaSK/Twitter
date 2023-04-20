import { Low } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Initialize the db with an empty object
db.data = {}

await db.read()

export default db
