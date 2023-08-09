import React, { memo } from 'react'

import { StyleProp, ViewStyle } from 'react-native'
import { ScaledSheet, vs } from 'react-native-size-matters'

import { Text } from '../../'
import { Pressable } from '../../Pressable'

interface ButtonSimpleT {
  title: string
  h?:
    | 'h0'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'h8'
    | 'h9'
    | 'h10'
    | 'h11'
    | 'h12'
  onPress?: () => void
  width?: number
  viewStyle?: StyleProp<ViewStyle>
}

const ButtonSimple = memo<ButtonSimpleT>(
  ({ title, onPress, h = 'h4', viewStyle }) => {
    const { container, fontStyle } = styles
    return (
      <Pressable onPress={onPress} style={[container, viewStyle]}>
        <Text numberOfLines={1} h={h} title={title} textStyle={fontStyle} />
      </Pressable>
    )
  },
)

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'center',
  },
  fontStyle: {
    marginTop: vs(5),
    marginBottom: vs(5),
  },
})

export { ButtonSimple }
