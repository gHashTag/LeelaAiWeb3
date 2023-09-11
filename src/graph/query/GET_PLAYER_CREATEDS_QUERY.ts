import { gql } from '@apollo/client'

export const GET_PLAYER_CREATEDS_QUERY = gql`
  query GetPlayerCreateds($playerId: Bytes!) {
    playerActions(
      first: 1
      orderBy: blockTimestamp
      orderDirection: desc
      where: { player: $playerId }
      subgraphError: allow
    ) {
      id
      avatar
      intention
      fullName
      player
      plan
    }
  }
`
