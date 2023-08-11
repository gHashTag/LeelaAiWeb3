import { Player } from 'types' // Подключите тип Player, если он определен
import { MAX_ROLL, TOTAL_PLANS } from './useLeelaGame'
import i18next from 'i18next'

const handleToMove = (
  name: string,
  updatedPlayer: Player,
  newPlan: number,
  to: number,
  roll: number,
): number => {
  updatedPlayer.message = i18next.t(name, {
    currentPlayer: updatedPlayer.id,
    from: newPlan,
    to: to,
    roll,
  })
  return to
}

const handlePlayerMovement = (
  newPlan: number,
  updatedPlayer: Player,
  roll: number,
): number => {
  if (newPlan > TOTAL_PLANS) {
    updatedPlayer.message = i18next.t('stay', {
      currentPlayer: updatedPlayer.id,
      roll,
    })
    newPlan = updatedPlayer.plan
  } else if (newPlan === 12) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 8, roll)
  } else if (newPlan === 16) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 4, roll)
  } else if (newPlan === 24) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 7, roll)
  } else if (newPlan === 29) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 6, roll)
  } else if (newPlan === 44) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 9, roll)
  } else if (newPlan === 52) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 35, roll)
  } else if (newPlan === 55) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 3, roll)
  } else if (newPlan === 61) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 13, roll)
  } else if (newPlan === 63) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 2, roll)
  } else if (newPlan === 72) {
    newPlan = handleToMove('snakes', updatedPlayer, newPlan, 51, roll)
  } else if (newPlan === 10) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 23, roll)
  } else if (newPlan === 17) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 69, roll)
  } else if (newPlan === 20) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 32, roll)
  } else if (newPlan === 22) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 60, roll)
  } else if (newPlan === 27) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 41, roll)
  } else if (newPlan === 28) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 50, roll)
  } else if (newPlan === 37) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 66, roll)
  } else if (newPlan === 45) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 67, roll)
  } else if (newPlan === 46) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 62, roll)
  } else if (newPlan === 54) {
    newPlan = handleToMove('arrows', updatedPlayer, newPlan, 68, roll)
  } else {
    updatedPlayer.message = i18next.t('moveMessage', {
      currentPlayer: updatedPlayer.id,
      roll: roll,
      from: updatedPlayer.plan,
      to: newPlan,
    })
  }

  if (roll === MAX_ROLL) {
    if (updatedPlayer.consecutiveSixes === 0) {
      updatedPlayer.message = i18next.t('firstSix', {
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
      return newPlan
    }
  } else {
    updatedPlayer.consecutiveSixes = 0
  }

  return newPlan
}

export { handlePlayerMovement }
