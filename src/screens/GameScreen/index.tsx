import React from 'react'

import { Display, Dice, GameBoard, Space, Background } from 'components'
import { useLeelaGame } from 'hooks'

const GameScreen: React.FC = () => {
  const { currentPlayer, lastRoll, rollDice } = useLeelaGame()

  // const sortedPlayers = players.sort((a) =>
  //   a.id === currentPlayer.id ? -1 : 1,
  // )

  return (
    <Background>
      <Space height={120} />
      <Display title={`${currentPlayer?.message}`} />
      {/* <Display title={`isStart: ${currentPlayer?.isStart}`} />
      <Display title={`isFinished: ${currentPlayer?.isFinished}`} />
      <Display title={`previousPlan: ${currentPlayer?.previousPlan}`} />
      <Display title={`consecutiveSixes: ${currentPlayer?.consecutiveSixes}`} />
      <Display
        title={`positionBeforeThreeSixes: ${currentPlayer?.positionBeforeThreeSixes}`}
      /> */}
      <Space height={20} />
      <GameBoard players={[currentPlayer]} />
      <Space height={10} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
      <Space height={40} />
    </Background>
  )
}

export { GameScreen }
