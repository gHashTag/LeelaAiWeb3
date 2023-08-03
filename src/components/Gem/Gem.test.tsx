// src/components/Gem/Gem.test.tsx
import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {Gem} from '../'

describe('Gem Component', () => {
  test('should have the correct testID prop', () => {
    const {getByTestId} = render(<Gem planNumber={5} onPress={() => {}} />)
    const gemImage = getByTestId('gem-image')
    expect(gemImage).toBeDefined()
  })

  test('should call the onPress function when pressed', () => {
    const onPressMock = jest.fn()
    const {getByTestId} = render(<Gem planNumber={5} onPress={onPressMock} />)
    const gemContainer = getByTestId('gem-container')
    fireEvent.press(gemContainer)
    expect(onPressMock).toHaveBeenCalled()
  })
})
