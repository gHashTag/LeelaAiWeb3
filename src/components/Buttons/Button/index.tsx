import React, { memo } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { ScaledSheet, ms, s } from 'react-native-size-matters'
import { Text, NeomorphView } from '../../'
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
    // @ts-ignore
    <NeomorphView viewStyle={styles.card}>
      <Pressable onPress={onPress} style={styles.container}>
        <Text h="h1" textStyle={[h, textStyle]} title={title} />
      </Pressable>
    </NeomorphView>
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
  card: {
    width: ms(230, 0.9),
    height: ms(60, 0.9),
  },
})

export { Button }
