import React, { useEffect } from 'react'

import {
  ALCHEMY_API_KEY,
  ALCHEMY_API_HTTPS,
  PUBLIC_KEY,
  PRIVATE_KEY,
} from '@env'
import { RlyMumbaiNetwork, getAccountPhrase } from '@rly-network/mobile-sdk'
import { GsnTransactionDetails } from '@rly-network/mobile-sdk/lib/typescript/gsnClient/utils'
import { Network, Alchemy, AlchemySubscription } from 'alchemy-sdk'
import { Display, Dice, GameBoard, Space, Background } from 'components'
import { ethers, ContractInterface } from 'ethers'
import { useLeelaGame } from 'hooks'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'store'

import LeelaGameABI from '/smart-contract/LeelaGameABI.json'

import { RlyNetwork } from '../../'

const settings = {
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
}

const alchemy = new Alchemy(settings)
const contractAbi = LeelaGameABI

const GameScreen: React.FC = () => {
  const { currentPlayer, lastRoll, rollDice } = useLeelaGame()
  const { t } = useTranslation()
  const [account] = useAccount()

  useEffect(() => {
    const contractAddress = '0xABfceEE4796674408126243912ad66d7E4ffA477'
    // sent test matic to contract 0x61715aE5947Bdc45f4853639d1a48962051622d5
    // https://mumbaifaucet.com
    const getContract = async () => {
      try {
        alchemy.core.getTokenBalances(PUBLIC_KEY).then(console.log)

        const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_HTTPS)

        const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

        // console.log('wallet', wallet)
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          wallet,
        )

        const rollDiceMethod = contractAbi.find(
          (item) => item.name === 'rollDice',
        )
        if (rollDiceMethod) {
          console.log('Метод rollDice найден:', rollDiceMethod)
        } else {
          console.log('Метод rollDice не найден')
        }
        const contractWithSigner = contract.connect(wallet)
        console.log('contractWithSigner', contractWithSigner)
        const rollResult = 6 // Укажите нужное значение rollResult
        if (contractWithSigner) {
          try {
            // 0.0002 matic one step
            const estimatedGas = await contractWithSigner.estimateGas.rollDice(
              rollResult,
            )
            console.log('estimatedGas', estimatedGas)
            const txResponse = await contractWithSigner.rollDice(rollResult, {
              gasLimit: estimatedGas,
            })
            console.log('Транзакция:', txResponse)
          } catch (error) {
            console.error('Ошибка при вызове rollDice:', error)
          }
        }

        // Подписка на событие DiceRolled
        contract.on('DiceRolled', (roller, rolled, currentPlan, event) => {
          console.log('Событие DiceRolled:', roller, rolled, currentPlan)
          console.log('event', event)
          // Обработка события здесь
        })

        // const gas = await myContract.estimateGas.rollDice()
        // console.log('gas', gas)
        // const { maxFeePerGas, maxPriorityFeePerGas } =
        //   await provider.getFeeData()

        // const gsnTx = {
        //   from: account,
        //   data: tx.data,
        //   to: tx.to,
        //   gasLimit: gas._hex,
        //   maxFeePerGas: maxFeePerGas?._hex,
        //   maxPriorityFeePerGas: maxPriorityFeePerGas?._hex,
        // } as GsnTransactionDetails

        // console.log('gsnTx', gsnTx)

        // if (RlyNetwork.relay) {
        //   const relay = await RlyNetwork.relay(gsnTx)
        //   console.log('relay', relay)
        // }
      } catch (error) {
        console.log('error', error)
      }
    }

    getContract()
  }, [])

  // const newBalance = await RlyNetwork.getBalance()
  // console.log('newBalance', newBalance)
  return (
    <Background>
      <Space height={20} />
      {/* <Display title={t(`${currentPlayer?.message}`)} /> */}
      <Space height={20} />
      <GameBoard players={[currentPlayer]} />
      <Space height={10} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
      <Space height={300} />
    </Background>
  )
}

export { GameScreen }
