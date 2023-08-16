import React, { memo, useState } from 'react'

import { Pressable, useColorScheme } from 'react-native'

import { dimGray, gray } from 'cons'
import { ScaledSheet, ms, s } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { NeomorphView, NeomorphFlexView } from '../..'

interface ButtonCircleProps {
  name: string
  onPress: () => void
  isIonicons: boolean
  size?: number
}

const ButtonCircle = memo<ButtonCircleProps>(
  ({ name, onPress, isIonicons, size = 30 }) => {
    const [isPressed, setIsPressed] = useState(false)

    const scheme = useColorScheme()
    const colorTheme = scheme === 'dark' ? dimGray : gray

    const handlePressIn = () => {
      setIsPressed(true)
    }

    const handlePressOut = () => {
      setIsPressed(false)
      onPress && onPress()
    }

    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.container}
        testID="buttonCircle"
      >
        {isPressed ? (
          // @ts-ignore
          <NeomorphFlexView viewStyle={styles.card}>
            {isIonicons ? (
              <Ionicons
                name={name}
                size={size}
                color={gray}
                style={styles.icon}
              />
            ) : (
              <Icon
                name={name}
                size={size}
                color={colorTheme}
                style={styles.icon}
              />
            )}
          </NeomorphFlexView>
        ) : (
          // @ts-ignore
          <NeomorphView viewStyle={styles.card}>
            {isIonicons ? (
              <Ionicons
                name={name}
                size={size}
                color={colorTheme}
                style={styles.icon}
              />
            ) : (
              <Icon
                name={name}
                size={size}
                color={colorTheme}
                style={styles.icon}
              />
            )}
          </NeomorphView>
        )}
      </Pressable>
    )
  },
)

const styles = ScaledSheet.create({
  container: {
    width: ms(60, 0.9),
    height: ms(60, 0.9),
    borderRadius: s(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  st: {
    height: 1,
  },
  card: {
    width: ms(60, 0.9),
    height: ms(60, 0.9),
    borderRadius: s(30),
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
})

export { ButtonCircle }
