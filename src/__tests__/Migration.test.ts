import path from 'path'
import { Migration } from '../Migration'

const fs = require('fs')

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
      await migration.migrate(2, Promise.resolve('hello'))
      await migration.migrate(5, Promise.resolve('hello'))
      await migration.migrate(6, Promise.resolve('hello'))

      migration = new Migration(migrationFile)
      expect(await migration.getVersion()).toEqual(6)
    })
  })
})