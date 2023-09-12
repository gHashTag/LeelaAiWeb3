import React, { useState } from 'react'

import { useQuery } from '@apollo/client'
import { PUBLIC_KEY } from '@env'
import { Display, Dice, GameBoard, Space, Background, Layout } from 'components'
import { GET_PLAYER_CREATEDS_QUERY } from 'graph'
import { useLeelaGame } from 'hooks'
// import { useTranslation } from 'react-i18next'
// import { useAccount } from 'store'

import { Query, DiceRolled } from '../../gql/graphql'

const GameScreen: React.FC = () => {
  // const [isLoading, setLoading] = useState(false)
  // const { t } = useTranslation()
  // const [account] = useAccount()

  const { currentPlayer, lastRoll, rollDice } = useLeelaGame()
  const { loading, error, data, isLoading } = useQuery<Query>(
    GET_PLAYER_CREATEDS_QUERY,
    {
      variables: {
        playerId: PUBLIC_KEY,
      },
    },
  )

  return (
    <Background>
      <Layout loading={isLoading}>
        <Space height={30} />
        {/* <Display title={currentPlayer?.message} /> */}
        <Space height={20} />
        <GameBoard players={data?.playerActions || []} />
        <Space height={10} />
        <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
        <Space height={300} />
      </Layout>
    </Background>
  )
}

export { GameScreen }
