import React, { memo } from 'react'
import { useTheme } from '@react-navigation/native'
import { ScaledSheet, ms, s } from 'react-native-size-matters'
import { Shadow } from 'react-native-neomorph-shadows'
import { lightGray, white } from 'cons'
import { ViewStyle } from 'react-native'

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
  width: number
  height: number
}

interface ShadowViewProps {
  children: React.ReactNode
  shadowStyle?: ViewStyleWithShadow
}

const ShadowView: React.FC<ShadowViewProps> = ({ children, shadowStyle }) => {
  const { shadow } = styles
  const { dark } = useTheme()

  return (
    <Shadow
      // @ts-ignore
      draw
      style={{
        // @ts-ignore
        ...shadow,
        ...shadowStyle,
      }}
    >
      {children}
    </Shadow>
  )
}

const styles = ScaledSheet.create({
  shadow: {
    alignSelf: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 6,
    shadowColor: lightGray,
    borderRadius: 25,
    shadowOpacity: 1,
    backgroundColor: white,
    alignItems: 'center',
  },
})

export { ShadowView }
