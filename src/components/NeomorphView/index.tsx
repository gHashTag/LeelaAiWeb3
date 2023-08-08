import React, { memo } from 'react'
import { useTheme } from '@react-navigation/native'
import { ScaledSheet, ms, s } from 'react-native-size-matters'
import { Neomorph } from 'react-native-neomorph-shadows'
import { W, black, lightGray, white } from 'cons'
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

interface NeomorphViewProps {
  children: React.ReactNode
  shadowStyle?: ViewStyleWithShadow
  viewStyle?: ViewProps
}

const NeomorphView: React.FC<NeomorphViewProps> = ({
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
        borderRadius: 20,
        shadowRadius: 5,
        backgroundColor,
      }}
    >
      <View style={[viewStyle]}>{children}</View>
    </Neomorph>
  )
}

const styles = ScaledSheet.create({
  container: {},
})

export { NeomorphView }
