import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Player } from 'types'
import { handlePlayerMovement } from './handlePlayerMovement'

const MAX_ROLL = 6
const WIN_PLAN = 68
export const TOTAL_PLANS = 72

const useLeelaGame = () => {
  const { t } = useTranslation()
  const starMess = t('sixToBegin')
  // Инициализация начального состояния игрока
  const [currentPlayer, setPlayer] = useState<Player>({
    id: 1,
    plan: 68,
    previousPlan: 68,
    isStart: false,
    isFinished: false,
    consecutiveSixes: 0,
    message: starMess,
    positionBeforeThreeSixes: 0,
  })
  const [lastRoll, setLastRoll] = useState<number>(1)
  const [rollHistory, setRollHistory] = useState<number[]>([])
  const [planHistory, setPlanHistory] = useState<number[]>([68])

  const generateRandomNumber = (): number => {
    const roll = Math.floor(Math.random() * MAX_ROLL) + 1
    return roll
  }

  const rollDice = () => {
    const rollResult = generateRandomNumber()
    setLastRoll(rollResult)
    setRollHistory((prev) => [...prev, rollResult])

    if (!currentPlayer.isStart && rollResult === MAX_ROLL) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        plan: MAX_ROLL,
        isStart: true,
        consecutiveSixes: 1,
        message: t('moveAfterSix', {
          currentPlayer: prevPlayer.id,
        }),
      }))
      return
    }

    handleRollResult(rollResult)
  }

  const handleRollResult = (roll: number) => {
    let updatedPlayer = { ...currentPlayer }

    if (!currentPlayer.isStart) {
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
      return
    }

    if (roll === MAX_ROLL) {
      if (updatedPlayer.consecutiveSixes === 0) {
        updatedPlayer.message = t('firstSix', {
          currentPlayer: updatedPlayer.id,
        })
        updatedPlayer.positionBeforeThreeSixes = updatedPlayer.plan
      }
      updatedPlayer.consecutiveSixes += 1
      if (updatedPlayer.consecutiveSixes === 3) {
        updatedPlayer.plan = updatedPlayer.positionBeforeThreeSixes
        updatedPlayer.consecutiveSixes = 0
        updatedPlayer.message = t('treeSix', {
          currentPlayer: updatedPlayer.id,
        })
        return
      }
    } else {
      updatedPlayer.consecutiveSixes = 0
    }

    movePlayer(roll, updatedPlayer)
  }

  const movePlayer = (roll: number, updatedPlayer: Player) => {
    let newPlan = updatedPlayer.plan + roll
    // Snakes and arrow that lead the player
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

    setPlayer(updatedPlayer)
  }

  return { currentPlayer, rollHistory, planHistory, rollDice, lastRoll }
}
export { useLeelaGame }
