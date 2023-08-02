import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {Gem} from '../'
import {ICONS} from './images'

describe('Gem Component', () => {
  test('should render the correct image based on playerNumber prop', () => {
    const {getByTestId} = render(<Gem playerNumber={3} onPress={() => {}} />)
    const gemImage = getByTestId('gem-image')
    expect(gemImage.props.source).toEqual(ICONS[2]) // Check the correct image based on playerNumber prop
  })

  test('should render the default image if playerNumber prop is invalid', () => {
    const {getByTestId} = render(<Gem playerNumber={10} onPress={() => {}} />)
    const gemImage = getByTestId('gem-image')
    expect(gemImage.props.source).toEqual(ICONS[0]) // Check the default image if playerNumber is invalid
  })

  test('should call the onPress function when pressed', () => {
    const onPressMock = jest.fn()
    const {getByTestId} = render(<Gem playerNumber={5} onPress={onPressMock} />)
    const gemContainer = getByTestId('gem-container')
    fireEvent.press(gemContainer)
    expect(onPressMock).toHaveBeenCalled()
  })
})
