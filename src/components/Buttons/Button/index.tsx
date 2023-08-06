import React, { memo } from 'react'
import { useTheme } from '@react-navigation/native'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { ScaledSheet, ms, s } from 'react-native-size-matters'
import { Text } from '../../'
import { black, gray, lightGray, white } from '../../../cons'
import { Pressable } from '../../Pressable'
import { Shadow } from 'react-native-neomorph-shadows'

type ViewStyleWithShadow = {
  width: number
  height: number
  shadowRadius?: number
  shadowOpacity?: number
  backgroundColor?: string
  shadowColor?: string
}

interface ButtonT {
  title: string
  cancel?: boolean
  onPress?: () => void
  textStyle?: StyleProp<TextStyle>
}

const Button = memo<ButtonT>(({ title, onPress, textStyle }) => {
  const { container, h, shadow } = styles
  const { dark } = useTheme()
  const borderColor = dark ? white : black
  const backgroundColor = dark ? black : white
  const shadowColor = dark ? black : white // Устанавливаем цвет тени в зависимости от темы

  return (
    <Shadow
      // @ts-ignore
      draw
      style={{
        // @ts-ignore
        ...shadow,
      }}
    >
      <Pressable onPress={onPress}>
        <Text h="h1" textStyle={[h, textStyle]} title={title} />
      </Pressable>
    </Shadow>
  )
})

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'center',
    width: ms(230, 0.9),
    height: ms(50, 0.9),
    borderRadius: s(40),
    borderWidth: 1,
    justifyContent: 'center',
  },
  h: {
    textAlign: 'center',
    paddingHorizontal: 15,
    top: 3,
  },
  shadow: {
    alignSelf: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    shadowColor: lightGray,
    borderRadius: 20,
    width: ms(230, 0.9),
    height: ms(60, 0.9),
    justifyContent: 'center',
    shadowOpacity: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
})

export { Button }
