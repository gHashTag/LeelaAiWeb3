import { gql } from '@apollo/client'

export const GetPlayerById = gql`
  query GetPlayerById($playerId: ID!) {
    getPlayer(id: $playerId) {
      id
      avatar
      email
      intention
      consecutiveSixes
      createdAt
      fullName
      isFinished
      isStart
      plan
      positionBeforeThreeSixes
      previousPlan
    }
  }
`
