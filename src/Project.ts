import mkdirp from 'mkdirp-promise'
import path from 'path'

import { Migration } from './Migration'

export class Project {

  constructor (private readonly migrationDir: string) {}

  async migrationForNetwork (networkName: string): Promise<Migration> {
    const dirPath = path.resolve(this.migrationDir)
    await mkdirp(dirPath)
    const migrationPath = path.resolve(path.join(dirPath, networkName))
    return new Migration(migrationPath)
  }
}