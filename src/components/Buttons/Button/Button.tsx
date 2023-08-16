import React, { memo, useState } from 'react'

import { StyleProp, TextStyle, Pressable } from 'react-native'

import { dimGray } from 'cons'
import { ScaledSheet, ms, s } from 'react-native-size-matters'

import { Text, NeomorphView, NeomorphFlexView, hT } from '../..'

interface ButtonProps {
  title: string
  onPress: () => void
  textStyle?: StyleProp<TextStyle>
  h?: hT
}

const Button = memo<ButtonProps>(({ title, onPress, textStyle, h = 'h1' }) => {
  const [isPressed, setIsPressed] = useState(false)

  const { h: textStyleH } = styles

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
            h={h}
            textStyle={[textStyleH, textStyle]}
            title={title}
            oneColor={dimGray}
          />
        </NeomorphFlexView>
      ) : (
        // @ts-ignore
        <NeomorphView viewStyle={styles.card}>
          <Text
            h={h}
            textStyle={[textStyleH, textStyle]}
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
