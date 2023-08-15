import React from 'react'

import { View, TextInput } from 'react-native'

import { NeomorphFlexView } from 'components'
import { gray } from 'cons'
import { ScaledSheet, ms, s } from 'react-native-size-matters'

interface TextInputFieldProps {
  placeholder: string
  multiline?: boolean
  value: string
  onBlur: () => void
  onChangeText: (text: string) => void
  inputMode?:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password'
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
  inputMode,
  keyboardType,
}) => {
  const inputComponent = (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={gray}
        multiline={multiline}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        inputMode={inputMode}
        keyboardType={keyboardType}
      />
    </View>
  )

  return (
    // @ts-ignore
    <NeomorphFlexView viewStyle={styles.card}>
      {inputComponent}
    </NeomorphFlexView>
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
