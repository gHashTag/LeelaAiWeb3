import React from 'react'
import {render, fireEvent, act} from '@testing-library/react-native'
import {Dice, DiceProps} from './'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
jest.mock('./Animated', () => {
  return {
    ...jest.requireActual('./Animated'),
    createAnimatedComponent: (component: any) => {
      return component
    },
  }
})

describe('Dice Component', () => {
  let mockProps: DiceProps
  beforeEach(() => {
    mockProps = {
      count: 1,
      players: 2,
      disabled: false,
      canGo: true,
      isReported: false,
      updateStep: jest.fn(),
      random: jest.fn(),
    }
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders correctly with the provided props', () => {
    const {getByTestId} = render(<Dice {...mockProps} />)
    expect(getByTestId('dice-component')).toBeDefined()
  })

  it('calls the random function and updateStep on press when not disabled', () => {
    const {getByTestId} = render(<Dice {...mockProps} />)

    act(() => {
      fireEvent.press(getByTestId('dice-component'))
      jest.runAllTimers()
    })

    expect(mockProps.random).toHaveBeenCalledTimes(1)
    expect(mockProps.updateStep).toHaveBeenCalledTimes(1)
  })

  it('does not call the random function and updateStep on press when disabled', () => {
    mockProps.disabled = true
    const {getByTestId} = render(<Dice {...mockProps} />)

    act(() => {
      fireEvent.press(getByTestId('dice-component'))
      jest.runAllTimers()
    })

    expect(mockProps.random).not.toHaveBeenCalled()
    expect(mockProps.updateStep).not.toHaveBeenCalled()
  })
})
