import React from 'react'
import { render, fireEvent, act } from '@testing-library/react-native'
import { Dice, DiceProps } from './'

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
      lastRoll: 1,
      disabled: false,
      rollDice: jest.fn(),
    }
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders correctly with the provided props', () => {
    const { getByTestId } = render(<Dice {...mockProps} />)
    expect(getByTestId('dice-component')).toBeDefined()
  })

  it('calls the rollDice function on press when not disabled', () => {
    const { getByTestId } = render(<Dice {...mockProps} />)

    act(() => {
      fireEvent.press(getByTestId('dice-component'))
      jest.runAllTimers()
    })

    expect(mockProps.rollDice).toHaveBeenCalledTimes(1)
  })

  it('does not call the rollDice function on press when disabled', () => {
    mockProps.disabled = true
    const { getByTestId } = render(<Dice {...mockProps} />)

    act(() => {
      fireEvent.press(getByTestId('dice-component'))
      jest.runAllTimers()
    })

    expect(mockProps.rollDice).not.toHaveBeenCalled()
  })

  it('updates dice image when rollDice function is called', () => {
    const { getByTestId, rerender } = render(<Dice {...mockProps} />)

    act(() => {
      fireEvent.press(getByTestId('dice-component'))
      jest.runAllTimers()
    })

    // Mock a new dice roll value
    const newDiceRoll = 2
    rerender(<Dice {...mockProps} lastRoll={newDiceRoll} />)

    const diceImage = getByTestId('dice-image') // Assuming you have testID on Animated.Image
    expect(diceImage.props.source).toEqual(
      require(`./assets/${newDiceRoll}.png`),
    )
  })
})
