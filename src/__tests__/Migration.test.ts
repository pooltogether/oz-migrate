import path from 'path'
import fs from 'fs'
import { Migration } from '../Migration'

describe('Migration', () => {

  let migration
  let migrationFile

  beforeEach(async () => {
    migrationFile = path.resolve('.1')
    migration = new Migration(migrationFile)
  })

  afterEach(() => {
    try {
      fs.unlinkSync(migrationFile)
    } catch (e) {}
  })

  describe('migrate()', () => {
    it('should load the correct version', async () => {
      await migration.migrate(1, Promise.resolve('hello'))
  
      const contents = fs.readFileSync(migrationFile)
      expect(contents.toString()).toEqual('1')
    })

    it('should support multiple', async () => {
      await migration.migrate(2, () => 'hello')
      await migration.migrate(5, () => 'hello')
      await migration.migrate(6, () => 'hello')

      migration = new Migration(migrationFile)
      expect(await migration.getVersion()).toEqual(6)
    })
  })
})