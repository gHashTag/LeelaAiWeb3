import { gql } from '@apollo/client'

export const GET_COMMENT_QUERY = gql`
  query GetCommentQuery($reportId: BigInt!) {
    commentActions(
      orderDirection: asc
      where: { reportId: $reportId }
      subgraphError: allow
    ) {
      id
      reportId
      actor
      avatar
      fullName
      content
      plan
      timestamp
    }
  }
`
