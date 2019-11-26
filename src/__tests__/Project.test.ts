import path from 'path'
import fs from 'fs'
import { Project } from '../Project'
import rimraf from 'rimraf'
import util from 'util'

const rmrf = util.promisify(rimraf)

describe('Project', () => {

  let projectDir

  beforeEach(async () => {
    projectDir = path.resolve('.oz-migrate')
  })

  afterEach(async () => {
    await rmrf(projectDir)
  })

  describe('migrationForNetwork()', () => {
    it('should setup a migration', async () => {
      const project = new Project(projectDir)
      const migration = await project.migrationForNetwork('local')

      migration.migrate(10, () => {})

      expect(fs.existsSync(path.join(projectDir, 'local')))
    })
  })
})