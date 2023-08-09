import { NeomorphFlexView } from 'components'
import { dimGray, gray, lightGray } from 'cons'
import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

interface TextInputFieldProps {
  iconName: string
  iconType: string
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
          placeholderTextColor={dimGray}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: dimGray,
  },
})

export { TextInputField }
