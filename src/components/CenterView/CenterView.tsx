import React, { ReactNode } from 'react'

import { StyleSheet, View, ViewStyle } from 'react-native'

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface CenterViewProps {
  children: ReactNode
  flex?: number
  style?: ViewStyle
}

const CenterView = ({ children, flex = 1, style }: CenterViewProps) => {
  return (
    <View style={[styles.main, { flex }, style]} testID="center-view">
      {children}
    </View>
  )
}

export { CenterView }
