import React from 'react'

import { render } from '@testing-library/react-native'
import { Player } from 'types'

import { GameBoard } from '../'

const players: Player[] = [
  {
    id: 2,
    plan: 72,
    avatar: 106,
  },
  {
    id: 4,
    plan: 34,
    avatar:
      'https://bafkreiftrmfmimlvo26xaxfvt2ypnjjaavq5mgnkjljs6mczfekii4cmtq.ipfs.nftstorage.link/',
  },
]

test('should render the correct number of Gem components based on the players prop', () => {
  const { getAllByTestId } = render(<GameBoard players={players} />)
  const gemComponents = getAllByTestId('gem-container')
  const playerGemImages = getAllByTestId('player-gem-image')
  expect(playerGemImages.length).toEqual(2) // Проверка на 2 игрока
  expect(gemComponents.length).toEqual(72) // Проверка на общее количество компонентов Gem
})
