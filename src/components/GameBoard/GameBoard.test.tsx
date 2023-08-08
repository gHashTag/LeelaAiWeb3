import React from 'react'
import { render } from '@testing-library/react-native'
import { GameBoard } from '../'

const players = [
  {
    id: 2,
    plan: 72,
    uri: 106,
  },
  {
    id: 4,
    plan: 34,
    uri: 'https://bafkreiftrmfmimlvo26xaxfvt2ypnjjaavq5mgnkjljs6mczfekii4cmtq.ipfs.nftstorage.link/',
  },
]

test('should render the correct number of Gem components based on the players prop', () => {
  const { getAllByTestId } = render(<GameBoard players={players} />)
  const gemComponents = getAllByTestId('gem-container')
  expect(gemComponents.length).toEqual(18) // Check the number of Gem components based on the provided players
})

test('should render empty Gem component on plan without player', () => {
  const { getByTestId } = render(<GameBoard players={players} />)
  const emptyGem = getByTestId('empty-gem')
  expect(emptyGem).toBeTruthy() // Check if the empty Gem component is rendered on a plan without a player
})
