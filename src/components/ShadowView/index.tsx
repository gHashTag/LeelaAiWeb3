import React, { memo } from 'react'
import { useTheme } from '@react-navigation/native'
import { ScaledSheet, ms, s } from 'react-native-size-matters'
import { Shadow } from 'react-native-neomorph-shadows'
import { W, lightGray, white } from 'cons'
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

interface ShadowViewProps {
  children: React.ReactNode
  shadowStyle?: ViewStyleWithShadow
  viewStyle?: ViewProps
}

const ShadowView: React.FC<ShadowViewProps> = ({
  children,
  viewStyle,
  shadowStyle,
}) => {
  const { dark } = useTheme()

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
      <View style={[viewStyle]}>{children}</View>
    </Shadow>
  )
}

const styles = ScaledSheet.create({
  shadow: {
    alignSelf: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 6,
    shadowColor: lightGray,
    shadowOpacity: 1,
    borderRadius: 25,
    backgroundColor: white,
    alignItems: 'center',
  },
})

export { ShadowView }
