import { useEffect, useReducer, useState } from 'react'

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
  message?: string
  consecutiveSixes: number
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
  | { type: 'MESSAGE'; message: string }
  | {
      type: 'INCREMENT_CONSECUTIVE_SIXES'
      count: number
    }
const initialState: State = {
  currentPlayer: {
    id: '1',
    plan: 68,
    previousPlan: 68,
    isStart: false,
    isFinished: false,
    consecutiveSixes: 0,
    fullName: 'Leela',
    positionBeforeThreeSixes: 0,
    avatar: GEM_ICONS[1],
    intention: '',
  },
  message: i18next.t('sixToBegin'),
  consecutiveSixes: 0,
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
    case 'MESSAGE':
      return {
        ...state,
        message: action.message,
      }
    case 'INCREMENT_CONSECUTIVE_SIXES':
      return {
        ...state,
        consecutiveSixes: action.count,
      }
    default:
      return state
  }
}

const useLeelaGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState({ message: '' })

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const playerData = await contract.getPlayer(PUBLIC_KEY)

        const currentPlayer: Player = {
          fullName: playerData[0],
          avatar: playerData[1],
          intention: playerData[2],
          plan: playerData[3].toString(),
          previousPlan: playerData[4].toString(),
          isStart: playerData[5],
          isFinished: playerData[6],
          consecutiveSixes: playerData[7].toString(),
          id: PUBLIC_KEY,
        }

        updatePlayer(currentPlayer)
      } catch (error) {
        console.error('Error fetching player:', error)
      }
    }

    fetchPlayer()
  }, [])

  const getContract = async (rollResult: number) => {
    setError({ message: '' })
    try {
      const txResponse = await contractWithSigner.rollDice(rollResult, {
        gasLimit,
      })
      console.log('txResponse', txResponse)
      const revert: string = await catchRevert(txResponse.hash)
      console.log('revert', revert)

      contract.on('DiceRolled', (roller, rolled, currentPlan) => {
        dispatch({ type: 'ROLL_DICE', rollResult: rolled })
        const key = plansData[currentPlan - 1].key
        setLoading(false)
        if (rolled === 6) {
          dispatch({
            type: 'MESSAGE',
            message: i18next.t('firstSix', {
              currentPlayer: state.currentPlayer.fullName,
            }),
          })
          dispatch({
            type: 'INCREMENT_CONSECUTIVE_SIXES',
            count: state.consecutiveSixes + 1,
          })
          if (state.consecutiveSixes === 3) {
            dispatch({
              type: 'MESSAGE',
              message: i18next.t('treeSix', {
                currentPlayer: state.currentPlayer.fullName,
              }),
            })
            dispatch({
              type: 'INCREMENT_CONSECUTIVE_SIXES',
              count: 0,
            })
          }
        } else {
          navigate('PLAN_SCREEN', { key })
        }

        return { roller, rolled, currentPlan }
      })
    } catch (err: string | any) {
      setError({ message: err })
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
    message: state.message,
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
