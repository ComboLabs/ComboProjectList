import fs from 'fs'
import path from 'path'

import { version } from '../package.json'
import { ProjectData } from './types'

/**
 * Base URL where static assets are hosted.
 */
const BASE_URL = 'https://github.com/ComboLabs/ComboProjectList'

/**
 * Generates a project list from the data in the data folder.
 *
 * @param datadir Directory containing data files.
 *
 * @returns Generated project list JSON object.
 */
export const generate = (datadir: string) => {
  return fs
    .readdirSync(datadir)
    .sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    })
    .map((folder) => {
      console.log("folder:", folder)
      const data: ProjectData = JSON.parse(
        fs.readFileSync(path.join(datadir, folder, 'data.json'), 'utf8')
      )
      console.log("data:", data)
      console.log(Object.entries(data.contract))
      return Object.entries(data.contract).map(([chain, project]) => {
        console.log("project:", project)
        const out = {
          contract_address: project.address,
          project_name: project.overrides?.project_name ?? data.project_name,
          project_describe: project.overrides?.project_describe ?? data.project_describe,
        }
        return out
      })
    })
    .reduce(
      (list, projects) => {
        list.projects = list.projects.concat(projects)
        return list
      },
      {
        name: 'Combo Chain Project List',
        logoURI: `${BASE_URL}/combo.png`,
        keywords: ['scaling', 'layer2', 'infrastructure'],
        timestamp: new Date().toISOString(),
        projects: [],
        version: {
          major: parseInt(version.split('.')[0], 10),
          minor: parseInt(version.split('.')[1], 10),
          patch: parseInt(version.split('.')[2], 10),
        },
      }
    )
}
