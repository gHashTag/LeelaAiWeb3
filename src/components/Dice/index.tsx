import React, {useRef} from 'react'
import {Animated, Easing, Pressable, StyleSheet} from 'react-native'
import {vs} from 'react-native-size-matters'

export interface DiceProps {
  disabled?: boolean
  rollDice: () => void
  lastRoll: number
  size?: 'small' | 'medium' | 'large'
}

const getImage = (number: number) => {
  switch (number) {
    case 1:
      return require('./assets/1.png')
    case 2:
      return require('./assets/2.png')
    case 3:
      return require('./assets/3.png')
    case 4:
      return require('./assets/4.png')
    case 5:
      return require('./assets/5.png')
    case 6:
      return require('./assets/6.png')
  }
}

const Dice = ({
  disabled = false,
  rollDice,
  lastRoll,
  size = 'medium',
}: DiceProps & {lastRoll: number}) => {
  const spinValue = useRef(new Animated.Value(0)).current

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const animateDice = (): void => {
    if (disabled) {
      return
    }

    spinValue.setValue(0)
    Animated.timing(spinValue, {
      toValue: 10,
      duration: 2000,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start(() => {
      rollDice()
    })
  }

  const getSize = () => {
    switch (size) {
      case 'small':
        return vs(50)
      case 'large':
        return vs(120)
      case 'medium':
      default:
        return vs(80)
    }
  }

  return (
    <Pressable
      onPress={animateDice}
      style={styles.diceContainer}
      testID="dice-component">
      <Animated.Image
        style={[
          styles.image,
          {transform: [{rotate: spin}], height: getSize(), width: getSize()},
        ]}
        source={getImage(lastRoll)}
        testID="dice-image"
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  diceContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: vs(12),
  },
  image: {
    height: vs(65),
    width: vs(65),
  },
})

export {Dice}
