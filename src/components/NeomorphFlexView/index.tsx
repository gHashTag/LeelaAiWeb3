import React from 'react'
import { useTheme } from '@react-navigation/native'
import { ScaledSheet } from 'react-native-size-matters'
import { NeomorphFlex } from 'react-native-neomorph-shadows'
import { black, lightGray } from 'cons'
import { View, ViewProps, ViewStyle } from 'react-native'

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

const NeomorphFlexView: React.FC<NeomorphCircleProps> = ({
  children,
  viewStyle,
  shadowStyle,
}) => {
  const { dark } = useTheme()
  console.log('dark', dark)
  const backgroundColor = dark ? black : lightGray
  console.log('backgroundColor', backgroundColor)
  return (
    <NeomorphFlex
      inner
      style={{
        // @ts-ignore
        ...styles.container,
        ...shadowStyle,
        ...viewStyle,
        backgroundColor,
      }}
    >
      <View style={viewStyle}>{children}</View>
    </NeomorphFlex>
  )
}

const styles = ScaledSheet.create({
  container: {
    borderRadius: 40,
    shadowRadius: 5,
    marginHorizontal: 40,
  },
})

export { NeomorphFlexView }
