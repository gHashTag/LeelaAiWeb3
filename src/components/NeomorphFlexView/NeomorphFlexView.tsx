import React from 'react'

import { View, ViewStyle, StyleSheet } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { black, lightGray } from 'cons'
import { NeomorphFlex } from 'react-native-neomorph-shadows'

interface NeomorphFlexViewProps {
  children: React.ReactNode
  viewStyle?: ViewStyle
  borderRadius?: number
}

const NeomorphFlexView: React.FC<NeomorphFlexViewProps> = ({
  children,
  viewStyle,
  borderRadius = 40,
}) => {
  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray
  return (
    <NeomorphFlex
      inner
      style={{
        ...styles.container,
        ...viewStyle,
        backgroundColor,
        borderRadius,
      }}
    >
      <View style={{ ...viewStyle, borderRadius }}>{children}</View>
    </NeomorphFlex>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    shadowRadius: 5,
  },
})

export { NeomorphFlexView }
