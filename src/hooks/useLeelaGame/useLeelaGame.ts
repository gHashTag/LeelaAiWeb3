import { useEffect, useReducer } from 'react'

import {
  ALCHEMY_API_KEY,
  ALCHEMY_API_HTTPS,
  PUBLIC_KEY,
  PRIVATE_KEY,
} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { RlyMumbaiNetwork, getAccountPhrase } from '@rly-network/mobile-sdk'
// import { GsnTransactionDetails } from '@rly-network/mobile-sdk/lib/typescript/gsnClient/utils'
import { Network, Alchemy } from 'alchemy-sdk'
import { captureException } from 'cons'
import { ethers } from 'ethers'
import i18next from 'i18next'
import { Player } from 'types'

const settings = {
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
}
import LeelaGameABI from '/smart-contract/LeelaGameABI.json'

import { handlePlayerMovement } from './handlePlayerMovement'
import { GEM_ICONS } from './images'

// import { RlyNetwork } from '../../'

const MAX_ROLL = 6

interface State {
  currentPlayer: Player
  lastRoll: number
  rollHistory: number[]
  planHistory: number[]
}

type RollDiceAction = {
  type: 'ROLL_DICE'
  rollResult: number
}

type Action =
  | RollDiceAction
  | { type: 'UPDATE_PLAYER'; player: Player }
  | { type: 'SET_ROLL_HISTORY'; rollHistory: number[] }
  | { type: 'SET_PLAN_HISTORY'; planHistory: number[] }
  | { type: 'SET_INITIAL_STATE'; initialState: State }

const initialState: State = {
  currentPlayer: {
    id: '1',
    plan: 68,
    previousPlan: 68,
    isStart: false,
    isFinished: false,
    consecutiveSixes: 0,
    fullName: 'Leela',
    message: i18next.t('sixToBegin'),
    positionBeforeThreeSixes: 0,
    avatar: GEM_ICONS[1],
    rallyAccount: '',
    email: '',
    intention: '',
  },
  lastRoll: 1,
  rollHistory: [],
  planHistory: [68],
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ROLL_DICE':
      const rollResult = action.rollResult
      return {
        ...state,
        lastRoll: rollResult,
        rollHistory: [...state.rollHistory, rollResult],
        currentPlayer: handlePlayerMovement(state.currentPlayer, rollResult),
      }
    case 'UPDATE_PLAYER':
      return {
        ...state,
        currentPlayer: action.player,
      }
    case 'SET_ROLL_HISTORY':
      return {
        ...state,
        rollHistory: action.rollHistory,
      }
    case 'SET_PLAN_HISTORY':
      return {
        ...state,
        planHistory: action.planHistory,
      }
    case 'SET_INITIAL_STATE':
      return action.initialState
    default:
      return state
  }
}

const alchemy = new Alchemy(settings)
const contractAbi = LeelaGameABI

const useLeelaGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getContract = async (rollResult: number) => {
    const contractAddress = '0xABfceEE4796674408126243912ad66d7E4ffA477'
    // sent test matic to contract 0x61715aE5947Bdc45f4853639d1a48962051622d5
    // https://mumbaifaucet.com
    try {
      alchemy.core.getTokenBalances(PUBLIC_KEY).then(console.log)

      const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_HTTPS)

      const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

      // @ts-ignore
      const contract = new ethers.Contract(contractAddress, contractAbi, wallet)

      const contractWithSigner = contract.connect(wallet)

      if (contractWithSigner) {
        try {
          // 0.0002 matic one step
          const estimatedGas =
            await contractWithSigner.estimateGas.rollDice(rollResult)
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
    } catch (error) {
      console.log('error', error)
    }
  }

  const getSavedState = async () => {
    try {
      const savedState = await AsyncStorage.getItem('leelaGameState')
      return savedState ? JSON.parse(savedState) : initialState
    } catch (error) {
      captureException(error, 'getSavedState')
      return initialState
    }
  }

  useEffect(() => {
    getSavedState().then((savedState) => {
      dispatch({ type: 'SET_INITIAL_STATE', initialState: savedState })
    })
  }, [])

  // Подписка на изменения стейта и сохранение в AsyncStorage
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('leelaGameState', JSON.stringify(state))
      } catch (error) {
        captureException(error, 'saveState')
      }
    }

    saveState()
  }, [state])

  const rollDice = () => {
    const rollResult = Math.floor(Math.random() * MAX_ROLL) + 1
    console.log('rollResult', rollResult)
    dispatch({ type: 'ROLL_DICE', rollResult }) // Передаем результат броска в действие
    // getContract(rollResult) // Вызываем getContract с результатом броска
  }

  const updatePlayer = (player: Player) => {
    dispatch({ type: 'UPDATE_PLAYER', player })
  }

  const setRollHistory = (rollHistory: number[]) => {
    dispatch({ type: 'SET_ROLL_HISTORY', rollHistory })
  }

  const setPlanHistory = (planHistory: number[]) => {
    dispatch({ type: 'SET_PLAN_HISTORY', planHistory })
  }

  return {
    currentPlayer: state.currentPlayer,
    rollHistory: state.rollHistory,
    planHistory: state.planHistory,
    rollDice,
    lastRoll: state.lastRoll,
    updatePlayer,
    setRollHistory,
    setPlanHistory,
  }
}

export { useLeelaGame }
