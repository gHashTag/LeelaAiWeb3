import {
  ALCHEMY_API_KEY,
  ALCHEMY_API_HTTPS,
  PRIVATE_KEY,
  CONTRACT_ADDRESS,
} from '@env'
import { Network, Alchemy } from 'alchemy-sdk'
import { ethers } from 'ethers'

import LeelaGameABI from '/smart-contract/LeelaGameABI.json'

export const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_HTTPS)

const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
}

export const alchemy = new Alchemy(settings)
export const contractAbi = LeelaGameABI

export const gasLimit = 400000

export const catchRevert = async (txHash: any) => {
  //https://mirror.xyz/n00b21337.eth/of4mFYGfvwAdrSNb_kZb3JoSY7UWjOUXkuZLGcVX1WU
  const tx = await provider.getTransaction(txHash)
  const response = await provider.call(
    {
      to: tx.to,
      from: tx.from,
      nonce: tx.nonce,
      gasLimit: tx.gasLimit,
      gasPrice: tx.gasPrice,
      data: tx.data,
      value: tx.value,
      chainId: tx.chainId,
      type: tx.type ?? undefined,
      accessList: tx.accessList,
    },
    tx.blockNumber,
  )
  const reason = ethers.utils.toUtf8String('0x' + response.substring(138))

  return reason
}

export const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

export const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  // @ts-ignore
  contractAbi,
  wallet,
)

export const contractWithSigner = contract.connect(wallet)

// sent test matic to contract 0x61715aE5947Bdc45f4853639d1a48962051622d5
// https://mumbaifaucet.com
