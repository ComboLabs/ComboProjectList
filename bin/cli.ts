import fs from 'fs'

import { Command } from 'commander'

import { generate } from '../src/generate'
import { validate } from '../src/validate'
import { version } from '../package.json'

const program = new Command()

program
  .name('optl')
  .description('CLI for generating and validating projectlists')
  .version(version)

program
  .command('validate')
  .description('Validate projectlist data files')
  .requiredOption('--datadir <datadir>', 'Directory containing data files')
  .option(
    '--projects <projects>',
    'Comma-separated list of projects to validate'
  )
  .action(async (options) => {
    console.log("options:", options)
    const results = await validate(options.datadir, options.projects.split(','))

    const validationResultsFilePath = 'validation_results.txt'
    const errs = results.filter((r) => r.type === 'error')
    const warns = results.filter((r) => r.type === 'warning')

    if (errs.length > 0 || warns.length > 0) {
      fs.writeFileSync(
        validationResultsFilePath,
        `Below are the results from running validation for the project changes. To ` +
        `re-run the validation locally run: ` +
        `pnpm validate --datadir ./data --projects ${options.projects}\n\n`
      )
    }

    if (errs.length > 0) {
      fs.appendFileSync(
        validationResultsFilePath,
        `These errors caused the validation to fail:\n${errs
          .map((err) => err.message)
          .join('\r\n')}\n\n`
      )
      for (const err of errs) {
        if (err.message.startsWith('final project list is invalid')) {
          // Message generated here is super long and doesn't really give more information than the
          // rest of the errors, so just print a short version of it instead.
          console.error(`error: final project list is invalid`)
        } else {
          console.error(`error: ${err.message}`)
        }
      }
    }

    if (warns.length > 0) {
      fs.appendFileSync(
        validationResultsFilePath,
        `These warnings were found during validation, but did not cause validation to fail:\n${warns
          .map((warn) => warn.message)
          .join('\r\n')}\n`
      )
      for (const warn of warns) {
        console.log(`warning: ${warn.message}`)
      }
    }

    if (errs.length > 0) {
      // Exit with error code so CI fails
      process.exit(1)
    }
  })

program
  .command('generate')
  .description('Generates a projectlist data file')
  .requiredOption('--datadir <datadir>', 'Directory containing data files')
  .requiredOption('--outfile <outfile>', 'Output file to write')
  .action(async (options) => {
    const list = generate(options.datadir)
    fs.writeFileSync(options.outfile, JSON.stringify(list, null, 2))
  })

program.parse()
