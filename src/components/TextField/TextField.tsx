import React from 'react'

import { View, StyleSheet, Pressable } from 'react-native'

import { NeomorphView, Text } from 'components'
import { gray } from 'cons'
import { ms, s } from 'react-native-size-matters'

interface TextFieldProps {
  isWide?: boolean
  value: string
  onPress?: () => void
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  isWide = false,
  onPress,
}) => {
  const height = ms(isWide ? 90 : 60, 0.9)
  const inputComponent = (
    <Pressable style={styles.container} onPress={onPress}>
      <Text h={'h3'} title={value} style={styles.text} />
    </Pressable>
  )

  return (
    <NeomorphView viewStyle={{ ...styles.card, height }}>
      {inputComponent}
    </NeomorphView>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: s(40),
    justifyContent: 'center',
    width: ms(290, 0.9),
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
  },
  text: {
    bottom: 1,
    color: gray,
    flex: 1,
    fontSize: 16,
  },
})

export { TextField }
