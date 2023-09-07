import { gql } from '@apollo/client'

export const GET_ALL_REPORTS_QUERY = gql`
  query GetAllReportsQuery {
    reportActions(
      orderBy: blockTimestamp
      orderDirection: desc
      subgraphError: allow
    ) {
      id
      reportId
      actor
      avatar
      fullName
      content
      plan
      likes
      isLikedByCurrentUser
      timestamp
    }
  }
`
