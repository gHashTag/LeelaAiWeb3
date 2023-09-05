import { useEffect, useReducer, useState } from 'react'

import { useQuery } from '@apollo/client'
import { PUBLIC_KEY } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  captureException,
  catchRevert,
  contract,
  contractWithSigner,
  gasLimit,
  navigate,
} from 'cons'
import { DiceRolled, Query } from 'gql/graphql'
import { GET_DICE_ROLLEDS } from 'graph'
import i18next from 'i18next'
import { Player } from 'types'

import { handlePlayerMovement } from './handlePlayerMovement'
import { GEM_ICONS } from './images'

import plansData from '../../plansList.json'

// import { RlyMumbaiNetwork, getAccountPhrase } from '@rly-network/mobile-sdk'
// import { GsnTransactionDetails } from '@rly-network/mobile-sdk/lib/typescript/gsnClient/utils'

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

const useLeelaGame = () => {
  const playerId = PUBLIC_KEY
  const { data } = useQuery<Query>(GET_DICE_ROLLEDS, {
    variables: { roller: playerId },
  })

  const diceRolleds: Array<DiceRolled> = data?.diceRolleds || []
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState({ message: '' })

  const getContract = async (rollResult: number) => {
    setError({ message: '' })
    try {
      const txResponse = await contractWithSigner.rollDice(6, {
        gasLimit,
      })
      console.log('txResponse', txResponse)
      const revert: string = await catchRevert(txResponse.hash)
      console.log('revert', revert)

      contract.on('DiceRolled', (roller, rolled, currentPlan, event) => {
        console.log('Событие DiceRolled:', roller, rolled, currentPlan)
        dispatch({ type: 'ROLL_DICE', rollResult: rolled })
        console.log('event', event)
        const key = plansData[currentPlan - 1].key
        navigate('PLAN_SCREEN', { key })
      })
    } catch (err: string | any) {
      const currentPlan = diceRolleds[0].currentPlan
      console.log('currentPlan', currentPlan)
      const key = plansData[currentPlan - 1].key
      console.log('key', key)
      navigate('PLAN_SCREEN', { key })
      setError({ message: err })
    } finally {
      setLoading(false)
    }
  }

  const getSavedState = async () => {
    try {
      const savedState = await AsyncStorage.getItem('leelaGameState')
      return savedState ? JSON.parse(savedState) : initialState
    } catch (err) {
      captureException(err, 'getSavedState')
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
      } catch (err) {
        captureException(err, 'saveState')
      }
    }

    saveState()
  }, [state])

  const rollDice = () => {
    setLoading(true)
    const rollResult = Math.floor(Math.random() * MAX_ROLL) + 1
    getContract(rollResult)
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
    isLoading,
    isError,
  }
}

export { useLeelaGame }
