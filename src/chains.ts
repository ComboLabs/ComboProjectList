import { ethers } from 'ethers'

import { Chain, L1Chain, L2Chain, Network } from './types'

export const NETWORK_DATA: Record<Chain, Network> = {
  ethereum: {
    id: 1,
    name: 'Mainnet',
    provider: new ethers.providers.InfuraProvider('homestead'),
    layer: 1,
  },
  combo: {
    id: 91715,
    name: 'Combo',
    provider: new ethers.providers.StaticJsonRpcProvider(
      'https://test-rpc.combonetwork.io'
    ),
    layer: 2,
  },
  goerli: {
    id: 5,
    name: 'Goerli',
    provider: new ethers.providers.InfuraProvider('goerli'),
    layer: 1,
  }
}

interface L2BridgeInformation {
  l2StandardBridgeAddress: string
}

interface L1BridgeInformation {
  l2Chain: L2Chain
  l1StandardBridgeAddress: string
}

export const L2_STANDARD_BRIDGE_INFORMATION: Record<
  L2Chain,
  L2BridgeInformation
> = {
  combo: {
    l2StandardBridgeAddress: '0x4200000000000000000000000000000000000010',
  }
}

export const L2_TO_L1_PAIR: Partial<Record<L2Chain, L1Chain>> = {
  combo: 'ethereum'
}

export const L1_STANDARD_BRIDGE_INFORMATION: Record<
  L1Chain,
  L1BridgeInformation[]
> = {
  ethereum: [
    {
      l2Chain: 'combo',
      l1StandardBridgeAddress: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
    }
  ],
  goerli: [
  ],
}
