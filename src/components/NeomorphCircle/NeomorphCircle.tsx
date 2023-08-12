import React from 'react'

import { View, ViewProps, ViewStyle } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { black, lightGray } from 'cons'
import { Neomorph } from 'react-native-neomorph-shadows'
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

interface NeomorphCircleProps {
  children: React.ReactNode
  shadowStyle?: ViewStyleWithShadow
  viewStyle?: ViewProps
}

const NeomorphCircle: React.FC<NeomorphCircleProps> = ({
  children,
  viewStyle,
  shadowStyle,
}) => {
  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray

  return (
    <Neomorph
      style={{
        // @ts-ignore
        ...styles.container,
        ...shadowStyle,
        ...viewStyle,
        backgroundColor,
      }}
    >
      <View style={viewStyle}>{children}</View>
    </Neomorph>
  )
}

const styles = ScaledSheet.create({
  container: {
    borderRadius: 40,
    shadowRadius: 5,
  },
})

export { NeomorphCircle }
