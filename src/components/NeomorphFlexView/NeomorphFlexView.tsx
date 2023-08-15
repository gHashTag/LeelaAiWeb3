import React from 'react'

import { View, ViewStyle } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { black, lightGray } from 'cons'
import { NeomorphFlex } from 'react-native-neomorph-shadows'
import { ScaledSheet } from 'react-native-size-matters'

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

interface NeomorphFlexViewProps {
  children: React.ReactNode
  shadowStyle?: ViewStyleWithShadow
  viewStyle?: ViewStyleWithShadow
  borderRadius?: number
}

const NeomorphFlexView: React.FC<NeomorphFlexViewProps> = ({
  children,
  viewStyle,
  shadowStyle,
  borderRadius = 40,
}) => {
  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray
  return (
    <NeomorphFlex
      inner
      style={{
        // @ts-ignore
        ...styles.container,
        ...shadowStyle,
        ...viewStyle,
        backgroundColor,
        borderRadius,
      }}
    >
      <View style={{ ...viewStyle, borderRadius }}>{children}</View>
    </NeomorphFlex>
  )
}

const styles = ScaledSheet.create({
  container: {
    shadowRadius: 5,
    marginHorizontal: 40,
  },
})

export { NeomorphFlexView }
