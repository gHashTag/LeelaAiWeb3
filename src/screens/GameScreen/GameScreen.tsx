import React from 'react'

import { Display, Dice, GameBoard, Space, Background } from 'components'
import { useLeelaGame } from 'hooks'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'store'

const GameScreen: React.FC = () => {
  const { currentPlayer, lastRoll, rollDice } = useLeelaGame()
  const { t } = useTranslation()
  const [account] = useAccount()

  console.log('currentPlayer', currentPlayer)
  return (
    <Background>
      <Space height={20} />
      {/* <Display title={t(`${currentPlayer?.message}`)} /> */}
      <Space height={20} />
      <GameBoard players={[currentPlayer]} />
      <Space height={10} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
      <Space height={300} />
    </Background>
  )
}

export { GameScreen }
