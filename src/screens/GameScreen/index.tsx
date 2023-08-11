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
      <Space height={80} />
      <Display title={`${currentPlayer?.message}`} />
      {/* <Display title={`isStart: ${currentPlayer?.isStart}`} />
      <Display title={`isFinished: ${currentPlayer?.isFinished}`} />
      <Display title={`previousPlan: ${currentPlayer?.previousPlan}`} />
      <Display title={`consecutiveSixes: ${currentPlayer?.consecutiveSixes}`} />
      <Display
        title={`positionBeforeThreeSixes: ${currentPlayer?.positionBeforeThreeSixes}`}
      /> */}
      <GameBoard players={[currentPlayer]} currentPlayerId={currentPlayer.id} />
      <Space height={40} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
      <Space height={40} />
    </Background>
  )
}

export { GameScreen }
