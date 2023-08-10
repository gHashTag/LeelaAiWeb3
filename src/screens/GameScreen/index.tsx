import React from 'react'
import { Display, Dice, GameBoard, Space, Background } from 'components'
import { useLeelaGame } from 'hooks'

const GameScreen: React.FC = () => {
  const {
    currentPlayer,
    players,
    rollHistory,
    planHistory,
    rollDice,
    lastRoll,
  } = useLeelaGame()

  return (
    <Background>
      <Space height={80} />
      <Display title={`${currentPlayer?.message}`} />
      <GameBoard players={players} currentPlayerId={currentPlayer.id} />
      <Space height={40} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="large" />
      <Space height={40} />
    </Background>
  )
}

export { GameScreen }
