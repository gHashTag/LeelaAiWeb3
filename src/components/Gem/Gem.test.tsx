import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'

import {runOnJS} from 'react-native-reanimated'

import {Gem} from '../'
import {ICONS} from './images' // Import the ICONS array from ./images

// Mock the runOnJS function
jest.mock('react-native-reanimated', () => {
  return {
    ...jest.requireActual('react-native-reanimated'),
    runOnJS: jest.fn(fn => fn()),
  }
})

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
    const gestureHandler = getByTestId('gesture-handler')
    fireEvent(gestureHandler, 'onGestureEvent')
    expect(runOnJS).toHaveBeenCalledWith(onPressMock)
  })
})
