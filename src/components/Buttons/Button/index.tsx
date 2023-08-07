import React, { memo } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { ScaledSheet, ms, s } from 'react-native-size-matters'
import { Text, ShadowView } from '../../'
import { Pressable } from '../../Pressable'

interface ButtonT {
  title: string
  cancel?: boolean
  onPress?: () => void
  textStyle?: StyleProp<TextStyle>
}

const Button = memo<ButtonT>(({ title, onPress, textStyle }) => {
  const { h } = styles
  return (
    <ShadowView>
      <Pressable onPress={onPress} style={styles.container}>
        <Text h="h1" textStyle={[h, textStyle]} title={title} />
      </Pressable>
    </ShadowView>
  )
})
const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    width: ms(230, 0.9),
    height: ms(60, 0.9),
  },
  h: {
    textAlign: 'center',
    paddingHorizontal: 15,
    top: 3,
  },
})

export { Button }
