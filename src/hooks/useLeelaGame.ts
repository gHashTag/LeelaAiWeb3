import { useState } from 'react'

type Player = {
  plan: number
  previousPlan: number
  isStart: boolean
  isFinished: boolean
  consecutiveSixes: number
}

export default function useLeelaGame() {
  const MAX_ROLL = 6
  const WIN_PLAN = 68
  const TOTAL_PLANS = 72

  // Инициализация начального состояния игрока
  const [player, setPlayer] = useState<Player>({
    plan: 68,
    previousPlan: 68,
    isStart: false,
    isFinished: false,
    consecutiveSixes: 0,
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

    if (!player.isStart && rollResult === MAX_ROLL) {
      setPlayer({
        ...player,
        plan: MAX_ROLL,
        isStart: true,
        consecutiveSixes: 1,
      })
      return
    }

    handleRollResult(rollResult)
  }

  const handleRollResult = (roll: number) => {
    let updatedPlayer = { ...player }

    if (!player.isStart) {
      if (roll === MAX_ROLL) {
        updatedPlayer = {
          ...updatedPlayer,
          isStart: true,
          consecutiveSixes: 1,
          plan: MAX_ROLL,
        }
        return
      }
      return
    }

    if (roll === MAX_ROLL) {
      updatedPlayer.consecutiveSixes += 1
      if (updatedPlayer.consecutiveSixes === 3) {
        updatedPlayer.plan = updatedPlayer.previousPlan
        updatedPlayer.consecutiveSixes = 0
        return
      }
    } else {
      updatedPlayer.consecutiveSixes = 0
    }

    movePlayer(roll, updatedPlayer)
  }

  const movePlayer = (roll: number, updatedPlayer: Player) => {
    let newPlan = updatedPlayer.plan + roll

    // здесь аналогичная логика преобразования newPlan из вашего смарт-контракта...
    // Snakes that lead the player downwards
    if (newPlan > TOTAL_PLANS) {
      newPlan = player.plan
    }
    if (newPlan === 12) {
      newPlan = 8
    } else if (newPlan === 16) {
      newPlan = 4
    } else if (newPlan === 24) {
      newPlan = 7
    } else if (newPlan === 29) {
      newPlan = 6
    } else if (newPlan === 44) {
      newPlan = 9
    } else if (newPlan === 52) {
      newPlan = 35
    } else if (newPlan === 55) {
      newPlan = 3
    } else if (newPlan === 61) {
      newPlan = 13
    } else if (newPlan === 63) {
      newPlan = 2
    } else if (newPlan === 72) {
      newPlan = 51
    }

    // Arrows that lead the player upwards
    else if (newPlan === 10) {
      newPlan = 23
    } else if (newPlan === 17) {
      newPlan = 69
    } else if (newPlan === 20) {
      newPlan = 32
    } else if (newPlan === 22) {
      newPlan = 60
    } else if (newPlan === 27) {
      newPlan = 41
    } else if (newPlan === 28) {
      newPlan = 50
    } else if (newPlan === 37) {
      newPlan = 66
    } else if (newPlan === 45) {
      newPlan = 67
    } else if (newPlan === 46) {
      newPlan = 62
    } else if (newPlan === 54) {
      newPlan = 68
    } else if (newPlan > TOTAL_PLANS) {
      // Player overshoots the goal, stays in place
      newPlan = player.plan
    }

    updatedPlayer = {
      ...updatedPlayer,
      plan: newPlan,
      previousPlan: updatedPlayer.plan,
    }

    setPlanHistory((prev) => [...prev, newPlan])

    // Проверка на завершение
    if (newPlan === WIN_PLAN) {
      updatedPlayer.isFinished = true
      updatedPlayer.previousPlan = newPlan
      updatedPlayer.isStart = false
    }

    setPlayer(updatedPlayer)
  }

  // Возврат данных и функции для использования в компоненте
  return { player, rollHistory, planHistory, rollDice, lastRoll }
}
