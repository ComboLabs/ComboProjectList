import fs from 'fs'
import path from 'path'

import { Validator } from 'jsonschema'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { schema } from '@uniswap/token-lists'

import { generate } from './generate'
import { TOKEN_DATA_SCHEMA } from './schemas'

import {
  ExpectedMismatches,
  ProjectData,
  ValidationResult,
} from './types'

/**
 * Validates a project list data folder.
 *
 * @param datadir Directory containing data files.
 * @param projects List of projects to run validation on.
 *
 * @return Validation results.
 */
export const validate = async (
  datadir: string,
  projects: string[]
): Promise<ValidationResult[]> => {
  // Load data files to validate and filter for requested projects
  const folders = fs
    .readdirSync(datadir)
    .sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    })
    .filter((folder) => {
      return !projects || projects.includes(folder)
    })

  const results = []
  // Load the CoinGecko projectlist once to avoid additional requests


  for (const folder of folders) {
    // Make sure the data file exists
    const datafile = path.join(datadir, folder, 'data.json')
    if (!fs.existsSync(datafile)) {
      results.push({
        type: 'error',
        message: `data file ${datafile} does not exist`,
      })
    }

    // Load the data now that we know it exists
    const data: ProjectData = JSON.parse(fs.readFileSync(datafile, 'utf8'))

    const expectedMismatchesFilePath = path.join(
      datadir,
      folder,
      'expectedMismatches.json'
    )
    const expectedMismatches: ExpectedMismatches = fs.existsSync(
      expectedMismatchesFilePath
    )
      ? JSON.parse(fs.readFileSync(expectedMismatchesFilePath, 'utf8'))
      : {}

    // Validate the data file
    const v = new Validator()
    const result = v.validate(data, TOKEN_DATA_SCHEMA as any)
    if (!result.valid) {
      for (const error of result.errors) {
        results.push({
          type: 'error',
          message: `${folder}: ${error.property}: ${error.message}`,
        })
      }

      // Since the data file is invalid, we can't continue validating the rest of the files
      continue
    }
  }

  return results
}

interface Prj {
  contract_address: string;
  project_name: string;
  project_describe: string;
}
