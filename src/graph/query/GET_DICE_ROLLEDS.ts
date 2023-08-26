import { gql } from '@apollo/client'

export const GET_DICE_ROLLEDS = gql`
  query GetDiceRolleds($roller: Bytes!) {
    diceRolleds(
      first: 10
      orderBy: id
      orderDirection: asc
      where: { roller: $roller }
    ) {
      blockNumber
      blockTimestamp
      currentPlan
      id
      rolled
      roller
      transactionHash
    }
  }
`
