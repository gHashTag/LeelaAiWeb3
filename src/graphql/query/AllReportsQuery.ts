import { gql } from '@apollo/client'

export const AllReportsQuery = gql`
  query AllReportsQuery {
    getAllReports {
      id
      plan
      player {
        avatar
        fullName
      }
      title
      createdAt
      comments {
        createdAt
        id
        title
      }
      likes {
        id
        player {
          id
        }
      }
    }
  }
`
