import React from 'react'
import { Display, Dice, GameBoard, Space } from 'components'
import { plansPlayers } from 'cons/mockdata'
import { useLeelaGame } from 'hooks'

const GameScreen: React.FC = () => {
  const { rollDice, lastRoll } = useLeelaGame()
  //const { player, rollHistory, planHistory, rollDice, lastRoll } = useLeelaGame()
  return (
    <>
      <Space height={100} />
      <Display title={'sixToBegin'} />
      <GameBoard players={plansPlayers} />
      <Space height={80} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="large" />
    </>
  )
}

export { GameScreen }
