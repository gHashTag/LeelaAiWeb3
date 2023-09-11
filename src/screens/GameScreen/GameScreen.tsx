import React from 'react'

import { useQuery } from '@apollo/client'
import { PUBLIC_KEY } from '@env'
import { Display, Dice, GameBoard, Space, Background } from 'components'
import { GET_PLAYER_CREATEDS_QUERY } from 'graph'
import { useLeelaGame } from 'hooks'
// import { useTranslation } from 'react-i18next'
// import { useAccount } from 'store'

import { Query, DiceRolled } from '../../gql/graphql'

const GameScreen: React.FC = () => {
  // const { t } = useTranslation()
  // const [account] = useAccount()

  const { currentPlayer, lastRoll, rollDice } = useLeelaGame()
  const { loading, error, data } = useQuery<Query>(GET_PLAYER_CREATEDS_QUERY, {
    variables: {
      playerId: PUBLIC_KEY,
    },
  })
  console.log('data', data)

  // const diceRolleds: Array<DiceRolled> = data?.diceRolleds || []
  // console.log('diceRolleds', diceRolleds)

  return (
    <Background>
      <Space height={30} />
      <Display title={currentPlayer?.message} />
      <Space height={20} />
      <GameBoard players={data?.playerActions || []} />
      <Space height={10} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
      <Space height={300} />
    </Background>
  )
}

export { GameScreen }
