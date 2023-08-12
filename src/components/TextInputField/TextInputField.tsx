import React from 'react'

import { View, TextInput } from 'react-native'

import { NeomorphFlexView } from 'components'
import { gray } from 'cons'
import { ScaledSheet } from 'react-native-size-matters'

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
  return (
    <NeomorphFlexView>
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={gray}
          multiline={multiline}
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>
    </NeomorphFlexView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
})

export { TextInputField }
