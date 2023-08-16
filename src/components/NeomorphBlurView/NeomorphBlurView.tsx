import React from 'react'

import { View, ViewProps, ViewStyle, StyleSheet } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { black, lightGray } from 'cons'
import { NeomorphBlur } from 'react-native-neomorph-shadows'

type FlexStyleProperties =
  | 'flex'
  | 'alignSelf'
  | 'flexGrow'
  | 'flexShrink'
  | 'flexBasis'

type ViewStyleWithoutFlex = Pick<
  ViewStyle,
  Exclude<keyof ViewStyle, FlexStyleProperties>
>

interface ViewStyleWithShadow extends ViewStyleWithoutFlex {
  shadowOffset?: {
    width: number
    height: number
  }
  shadowOpacity?: number
  shadowColor?: string
  shadowRadius?: number
  borderRadius?: number
  backgroundColor?: string
  width?: number
  height?: number
}

interface NeomorphBlurViewProps {
  children?: React.ReactNode
  shadowStyle?: ViewStyleWithShadow
  viewStyle?: ViewProps
}

const NeomorphBlurView: React.FC<NeomorphBlurViewProps> = ({
  children,
  viewStyle,
  shadowStyle,
}) => {
  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray

  return (
    <NeomorphBlur
      style={{
        // @ts-ignore
        ...styles.container,
        ...shadowStyle,
        ...viewStyle,
        backgroundColor,
      }}
      testID="neomorph-blur-view"
    >
      <View style={viewStyle}>{children ? children : ''}</View>
    </NeomorphBlur>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: black,
    borderRadius: 70,
    height: 140,
    shadowRadius: 12,
    width: 140,
  },
})

export { NeomorphBlurView }
