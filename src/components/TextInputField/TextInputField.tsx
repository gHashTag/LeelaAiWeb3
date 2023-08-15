import React, { useState } from 'react'

import { View, TextInput } from 'react-native'

import { NeomorphView, NeomorphFlexView } from 'components'
import { gray } from 'cons'
import { ScaledSheet, ms, s } from 'react-native-size-matters'

interface TextInputFieldProps {
  placeholder: string
  multiline?: boolean
  value: string
  onBlur: () => void
  onChangeText: (text: string) => void
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  value,
  onBlur,
  onChangeText,
  multiline = false,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleBlur = () => {
    setIsFocused(false)
    onBlur && onBlur()
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  return (
    <View>
      {isFocused ? (
        //@ts-ignore
        <NeomorphFlexView viewStyle={styles.card}>
          <View style={styles.container}>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={gray}
              multiline={multiline}
              value={value}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChangeText={onChangeText}
              style={styles.input}
            />
          </View>
        </NeomorphFlexView>
      ) : (
        //@ts-ignore
        <NeomorphView viewStyle={styles.card}>
          <View style={styles.container}>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={gray}
              multiline={multiline}
              value={value}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChangeText={onChangeText}
              style={styles.input}
            />
          </View>
        </NeomorphView>
      )}
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    bottom: 1,
    fontSize: 16,
    color: gray,
  },
  card: {
    width: ms(230, 0.9),
    height: ms(60, 0.9),
    borderRadius: s(40),
    justifyContent: 'center',
    alignSelf: 'center',
  },
})

export { TextInputField }
