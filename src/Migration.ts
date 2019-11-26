import fs from 'fs'
import util from 'util'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

export class Migration {

  private version: number;

  constructor (private readonly migrationFile: string) {
    if (!migrationFile) throw 'migration file must be defined'
  }

  async getVersion (): Promise<number> {
    let version = -1
    if (fs.existsSync(this.migrationFile)) {
      const contents = await readFile(this.migrationFile)
      if (contents) {
        version = parseInt(contents.toString())
      }
    }
    return version
  }

  async setVersion (version: number): Promise<void> {
    await writeFile(this.migrationFile, `${version}`)
  }

  async migrate (version: number, callback: Function) {
    const currentVersion = await this.getVersion()

    if (currentVersion < version) {
      try {
        if (typeof callback === 'function') {
          await callback()
        } else {
          await callback
        }
      } catch (e) {
        console.error(e.message, e)
        throw e
      }
      await this.setVersion(version)
    }
  }
}