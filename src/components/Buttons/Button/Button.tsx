import React, { memo, useState } from 'react'

import { StyleProp, TextStyle, Pressable } from 'react-native'

import { dimGray } from 'cons'
import { ScaledSheet, ms, s } from 'react-native-size-matters'

import { Text, NeomorphView, NeomorphFlexView } from '../..' // Подключите необходимые компоненты

interface ButtonT {
  title: string
  onPress?: () => void
  textStyle?: StyleProp<TextStyle>
}

const Button = memo<ButtonT>(({ title, onPress, textStyle }) => {
  const [isPressed, setIsPressed] = useState(false)

  const { h } = styles

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
    >
      {isPressed ? (
        // @ts-ignore
        <NeomorphFlexView viewStyle={styles.card}>
          <Text
            testID="button-container"
            h="h1"
            textStyle={[h, textStyle]}
            title={title}
            oneColor={dimGray}
          />
        </NeomorphFlexView>
      ) : (
        // @ts-ignore
        <NeomorphView viewStyle={styles.card}>
          <Text
            h="h1"
            textStyle={[h, textStyle]}
            title={title}
            testID="button-title"
          />
        </NeomorphView>
      )}
    </Pressable>
  )
})

const styles = ScaledSheet.create({
  container: {
    width: ms(230, 0.9),
    height: ms(60, 0.9),
  },
  h: {
    top: 3,
    textAlign: 'center',
  },
  card: {
    width: ms(230, 0.9),
    height: ms(60, 0.9),
    borderRadius: s(40),
    justifyContent: 'center',
    alignSelf: 'center',
  },
})

export { Button }
