import path from 'path'
import { Migration } from './Migration'

const util = require('util')
const mkdirp = require('mkdirp')

const mkdirpAsync = util.promisify(mkdirp)

export class Project {

  constructor (private readonly migrationDir: string) {}

  async migrationForNetwork (networkName: string): Promise<Migration> {
    const dirPath = path.resolve(this.migrationDir)
    await mkdirpAsync(dirPath)
    const migrationPath = path.resolve(path.join(dirPath, networkName))
    return new Migration(migrationPath)
  }
}