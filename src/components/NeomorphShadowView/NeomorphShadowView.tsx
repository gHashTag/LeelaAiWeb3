import React from 'react'

import { View, ViewProps, ViewStyle, StyleSheet } from 'react-native'

import { lightGray, white } from 'cons'
import { Shadow } from 'react-native-neomorph-shadows'

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

interface NeomorphShadowViewProps {
  children: React.ReactNode
  shadowStyle?: ViewStyleWithShadow
  viewStyle?: ViewProps
}

const NeomorphShadowView: React.FC<NeomorphShadowViewProps> = ({
  children,
  viewStyle,
  shadowStyle,
}) => {
  return (
    <Shadow
      // @ts-ignore

      draw
      style={{
        // @ts-ignore
        ...styles.shadow,
        ...shadowStyle,
      }}
    >
      <View style={viewStyle}>{children}</View>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  shadow: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: white,
    borderRadius: 25,
    shadowColor: lightGray,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
})

export { NeomorphShadowView }
