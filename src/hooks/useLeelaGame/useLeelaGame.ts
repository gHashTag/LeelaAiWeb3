import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GEM_ICONS } from './images'
import { Player } from 'types'
import { handlePlayerMovement } from './handlePlayerMovement'

export const MAX_ROLL = 6
const WIN_PLAN = 68
export const TOTAL_PLANS = 72

export const updatePlayerAvatar = (
  currentPlayer: Player,
  newAvatar: string,
): Player => {
  return {
    ...currentPlayer,
    avatar: newAvatar,
  }
}

const useLeelaGame = () => {
  const { t } = useTranslation()
  const starMess = t('sixToBegin')

  const initialPlayerState = {
    id: 1,
    plan: 68,
    previousPlan: 68,
    isStart: false,
    isFinished: false,
    consecutiveSixes: 0,
    message: starMess,
    positionBeforeThreeSixes: 0,
    avatar: GEM_ICONS[1],
  }

  const [currentPlayer, setCurrentPlayer] = useState<Player>(initialPlayerState)
  const [lastRoll, setLastRoll] = useState<number>(1)
  const [rollHistory, setRollHistory] = useState<number[]>([])
  const [planHistory, setPlanHistory] = useState<number[]>([68])

  const generateRandomNumber = (): number =>
    Math.floor(Math.random() * MAX_ROLL) + 1

  const rollDice = () => {
    const rollResult = generateRandomNumber()
    setLastRoll(rollResult)
    setRollHistory((prev) => [...prev, rollResult])

    if (!currentPlayer.isStart && rollResult === MAX_ROLL) {
      setCurrentPlayer((prevPlayer) => ({
        ...prevPlayer,
        plan: MAX_ROLL,
        isStart: true,
        consecutiveSixes: 1,
        message: t('moveAfterSix', {
          currentPlayer: prevPlayer.id,
        }),
      }))
    } else {
      handleRollResult(rollResult)
    }
  }

  const handleRollResult = (roll: number) => {
    setCurrentPlayer((prevPlayer) => {
      let updatedPlayer = { ...prevPlayer }

      if (!prevPlayer.isStart) {
        if (roll === MAX_ROLL) {
          const updatedState = {
            isStart: true,
            consecutiveSixes: 1,
            plan: MAX_ROLL,
          }
          updatedPlayer = {
            ...updatedPlayer,
            ...updatedState,
          }
        }
        return updatedPlayer
      }

      let newPlan = updatedPlayer.plan + roll
      newPlan = handlePlayerMovement(newPlan, updatedPlayer, roll)

      updatedPlayer = {
        ...updatedPlayer,
        plan: newPlan,
        previousPlan: updatedPlayer.plan,
      }

      setPlanHistory((prev) => [...prev, newPlan])

      if (newPlan === WIN_PLAN) {
        updatedPlayer.isFinished = true
        updatedPlayer.previousPlan = newPlan
        updatedPlayer.isStart = false
        updatedPlayer.message = t('finish', {
          currentPlayer: updatedPlayer.id,
        })
      }

      return updatedPlayer
    })
  }

  return { currentPlayer, rollHistory, planHistory, rollDice, lastRoll }
}

export { useLeelaGame }
