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
      likes {
        id
        player {
          id
          fullName
        }
      }
      comments {
        createdAt
        id
        title
        author {
          avatar
          fullName
          plan
        }
      }
    }
  }
`
