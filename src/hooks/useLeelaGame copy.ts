import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Player } from 'types'

const useLeelaGame = () => {
  const MAX_ROLL = 6
  const WIN_PLAN = 68
  const TOTAL_PLANS = 72
  const TOTAL_PLAYERS = 6

  const { t } = useTranslation()
  const starMess = t('sixToBegin')

  // Инициализация начального состояния игроков
  const initialPlayers = Array(TOTAL_PLAYERS)
    .fill(null)
    .map((_, idx) => ({
      id: idx + 1,
      plan: 68,
      previousPlan: 68,
      isStart: false,
      isFinished: false,
      consecutiveSixes: 0,
      positionBeforeThreeSixes: 0,
      uri: idx + 1,
      stepInfo: `Ход игрока 1`,
      moveInfo: starMess,
    }))

  const [players, setPlayers] = useState<Player[]>(initialPlayers)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
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

    const currentPlayer = { ...players[currentPlayerIndex] }

    if (currentPlayer.consecutiveSixes === 1 && currentPlayer.isStart) {
      handleRollResult(rollResult, currentPlayer)
    } else if (!currentPlayer.isStart && rollResult === MAX_ROLL) {
      currentPlayer.plan = MAX_ROLL
      currentPlayer.isStart = true
      currentPlayer.consecutiveSixes = 1
      currentPlayer.stepInfo = `Ход игрока ${currentPlayer.id}`
      currentPlayer.moveInfo = `Игрок ${currentPlayer.id} начал игру с броска 6!`
    } else if (!currentPlayer.isStart) {
      currentPlayer.moveInfo = `Игрок ${currentPlayer.id} бросил ${rollResult}, но ему нужно 6, чтобы начать игру.`
    } else {
      handleRollResult(rollResult, currentPlayer)
    }

    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers]
      newPlayers[currentPlayerIndex] = currentPlayer

      const nextPlayerIndex = (currentPlayerIndex + 1) % TOTAL_PLAYERS
      const nextPlayer = { ...newPlayers[nextPlayerIndex] }
      nextPlayer.stepInfo = `Ход игрока ${currentPlayer.id}`
      nextPlayer.moveInfo = `Игрок ${nextPlayer.id} кидает кубик следующим!`
      newPlayers[nextPlayerIndex] = nextPlayer
      return newPlayers
    })

    setCurrentPlayerIndex((prevIdx) => (prevIdx + 1) % TOTAL_PLAYERS)
  }

  const handleRollResult = (roll: number, playerToUpdate: Player) => {
    if (!playerToUpdate.isStart) {
      if (roll === MAX_ROLL) {
        playerToUpdate.isStart = true
        playerToUpdate.consecutiveSixes = 1
        playerToUpdate.plan = MAX_ROLL
        return
      } else {
        playerToUpdate.moveInfo = `Игрок ${playerToUpdate.id} бросил ${roll}, но ему нужно 6, чтобы начать игру.`
        return
      }
    }

    if (roll === MAX_ROLL) {
      if (playerToUpdate.consecutiveSixes === 0) {
        playerToUpdate.positionBeforeThreeSixes = playerToUpdate.plan
      }
      playerToUpdate.consecutiveSixes += 1

      if (playerToUpdate.consecutiveSixes === 3) {
        playerToUpdate.plan = playerToUpdate.positionBeforeThreeSixes
        playerToUpdate.consecutiveSixes = 0
        playerToUpdate.moveInfo = `Игрок ${playerToUpdate.id} бросил 6 три раза подряд! Его возвращают на позицию до этих бросков.`
      } else {
        playerToUpdate.moveInfo = `Игрок ${playerToUpdate.id} бросил 6 и получает еще один ход!`
      }
      return
    }

    movePlayer(roll, playerToUpdate)
  }

  const movePlayer = (roll: number, updatedPlayer: Player) => {
    let newPlan = updatedPlayer.plan + roll

    if (newPlan > TOTAL_PLANS) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} бросил ${roll}, что выходит за пределы игрового поля. Он остается на месте.`
    } else if (newPlan === 12) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 12 на план 8.`
      newPlan = 8
    } else if (newPlan === 16) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 16 на план 4.`
      newPlan = 4
    } else if (newPlan === 24) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 24 на план 7.`
      newPlan = 7
    } else if (newPlan === 29) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 29 на план 6.`
      newPlan = 6
    } else if (newPlan === 44) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 44 на план 9.`
      newPlan = 9
    } else if (newPlan === 52) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 52 на план 35.`
      newPlan = 35
    } else if (newPlan === 55) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 55 на план 3.`
      newPlan = 3
    } else if (newPlan === 61) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 61 на план 13.`
      newPlan = 13
    } else if (newPlan === 63) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 63 на план 2.`
      newPlan = 2
    } else if (newPlan === 72) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на змею и перемещается с плана 72 на план 51.`
      newPlan = 51
    } else if (newPlan === 10) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 10 на план 23.`
      newPlan = 23
    } else if (newPlan === 17) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 17 на план 69.`
      newPlan = 69
    } else if (newPlan === 20) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 20 на план 32.`
      newPlan = 32
    } else if (newPlan === 22) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 22 на план 60.`
      newPlan = 60
    } else if (newPlan === 27) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 27 на план 41.`
      newPlan = 41
    } else if (newPlan === 28) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 28 на план 50.`
      newPlan = 50
    } else if (newPlan === 37) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 37 на план 66.`
      newPlan = 66
    } else if (newPlan === 45) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 45 на план 67.`
      newPlan = 67
    } else if (newPlan === 46) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 46 на план 62.`
      newPlan = 62
    } else if (newPlan === 54) {
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} попал на стрелку и перемещается с плана 54 на план 68.`
      newPlan = 68
    } else if (newPlan > TOTAL_PLANS) {
      newPlan = updatedPlayer.plan
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} бросил ${roll}, что выходит за пределы игрового поля. Он остается на месте.`
    }

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
      updatedPlayer.moveInfo = `Игрок ${updatedPlayer.id} достиг плана победы и завершил игру. Поздравляем!!!`
    }

    const updatedPlayers = players.map((player) =>
      player.id === updatedPlayer.id ? updatedPlayer : player,
    )
    setPlayers(updatedPlayers)
  }
  const currentPlayer = players[currentPlayerIndex]
  // Возврат данных и функции для использования в компоненте
  return {
    currentPlayer,
    players,
    rollHistory,
    planHistory,
    rollDice,
    lastRoll,
  }
}
export { useLeelaGame }
