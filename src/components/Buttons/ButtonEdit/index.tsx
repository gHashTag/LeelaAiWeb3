import React from 'react'

import { Image, StyleProp, ViewStyle } from 'react-native'
import { vs, ScaledSheet } from 'react-native-size-matters'

import { Pressable } from '../../Pressable'

interface ButtonEditT {
  onPress: () => void
  viewStyle?: StyleProp<ViewStyle>
}

const ButtonEdit = ({ onPress, viewStyle }: ButtonEditT) => {
  return (
    <Pressable onPress={onPress} style={viewStyle}>
      <Image style={styles.img} source={require('./edit.png')} />
    </Pressable>
  )
}

const styles = ScaledSheet.create({
  img: {
    width: vs(18),
    height: vs(18),
  },
})

export { ButtonEdit }
