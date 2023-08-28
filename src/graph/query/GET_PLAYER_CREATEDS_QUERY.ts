import { gql } from '@apollo/client'

export const GET_PLAYER_CREATEDS_QUERY = gql`
  query GetPlayerCreateds($playerId: Bytes!) {
    playerActions(where: { player: $playerId }) {
      id
      avatar
      intention
      fullName
      player
    }
  }
`
