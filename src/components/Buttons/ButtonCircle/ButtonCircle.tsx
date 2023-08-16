import React, { memo, useState } from 'react'

import { Pressable, useColorScheme, StyleSheet } from 'react-native'

import { dimGray, gray } from 'cons'
import { ms, s } from 'react-native-size-matters'
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

const styles = StyleSheet.create({
  card: {
    borderRadius: s(30),
    height: ms(60, 0.9),
    justifyContent: 'center',
    width: ms(60, 0.9),
  },
  container: {
    alignItems: 'center',
    borderRadius: s(30),
    height: ms(60, 0.9),
    justifyContent: 'center',
    width: ms(60, 0.9),
  },
  icon: {
    alignSelf: 'center',
  },
  st: {
    height: 1,
  },
})

export { ButtonCircle }
