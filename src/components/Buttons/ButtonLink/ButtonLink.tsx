import React, { memo } from 'react'

import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { secondary } from 'cons'
import { ScaledSheet } from 'react-native-size-matters'

import { Text } from '../..'
import { Pressable } from '../../Pressable/Pressable'

interface ButtonLinkT {
  title: string
  viewStyle?: StyleProp<ViewStyle>
  onPress?: () => void
  textStyle?: StyleProp<TextStyle>
}

const ButtonLink = memo<ButtonLinkT>(
  ({ title, viewStyle, textStyle, onPress }) => {
    const { container, h } = styles

    return (
      <Pressable onPress={onPress} style={[container, viewStyle]}>
        <Text h={'h4'} title={title} textStyle={[h, textStyle]} />
      </Pressable>
    )
  },
)

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  h: {
    textDecorationLine: 'underline',
    color: secondary,
  },
})

export { ButtonLink }
