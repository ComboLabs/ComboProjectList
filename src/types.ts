import { providers } from 'ethers'

export interface Project {
  address?: string  
  overrides?: {
    project_name: string
    project_describe: string
  }
}

/*
 * Supported chains for the tokenlist
 * If adding a new chain consider keeping the name
 * consistent with wagmi
 * @see https://github.com/wagmi-dev/references/blob/main/packages/chains/src/optimismGoerli.ts
 */
export type Chain =
  | 'ethereum'
  | 'combo'
  | 'goerli'

const l2Chains = ['combo'] as const
export type L2Chain = typeof l2Chains[number]

export const isL2Chain = (chain: string): chain is L2Chain => {
  return l2Chains.includes(chain as L2Chain)
}

export const isL1Chain = (chain: string): chain is L1Chain => !isL2Chain(chain)

export type L1Chain = 'ethereum' | 'goerli'

export interface ProjectData {
  project_name: string
  project_describe: string
  contract:  Partial<Record<Chain, Project>>
}

export interface ExpectedMismatches {
  project_name?: string
  project_describe?: string
}

export interface ValidationResult {
  type: 'error' | 'warning'
  message: string
}

export interface Network {
  id: number
  name: string
  provider: providers.BaseProvider
  layer: number
}
