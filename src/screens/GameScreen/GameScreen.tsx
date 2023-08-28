import React from 'react'

import { useQuery } from '@apollo/client'
import { Display, Dice, GameBoard, Space, Background } from 'components'
import { GET_DICE_ROLLEDS } from 'graph'
import { useLeelaGame } from 'hooks'
// import { useTranslation } from 'react-i18next'
// import { useAccount } from 'store'

import { Query, DiceRolled } from '../../gql/graphql'

const GameScreen: React.FC = () => {
  // const { t } = useTranslation()
  // const [account] = useAccount()
  const playerId = '0x1E2f5274bB5Bb29297260D9abAE41474D8331373'
  const { currentPlayer, lastRoll, rollDice } = useLeelaGame()
  const { loading, error, data } = useQuery<Query>(GET_DICE_ROLLEDS, {
    variables: { roller: playerId },
  })

  const diceRolleds: Array<DiceRolled> = data?.diceRolleds || []
  console.log('diceRolleds', diceRolleds)

  return (
    <Background>
      <Space height={30} />
      <Display title={currentPlayer?.message} />
      <Space height={20} />
      <GameBoard players={[currentPlayer]} />
      <Space height={10} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
      <Space height={300} />
    </Background>
  )
}

export { GameScreen }
