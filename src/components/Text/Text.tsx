import React, { memo } from 'react'

import {
  Platform,
  Text as RNText,
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
  useColorScheme,
} from 'react-native'

import { gray } from 'cons'
import { ScaledSheet, ms, s } from 'react-native-size-matters'

export type hT = 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

export interface Icolors {
  dark: string
  light: string
}

export interface TxtT extends TextProps {
  title: string
  h?: hT
  colors?: Icolors
  oneColor?: string
  numberOfLines?: number
  textStyle?: StyleProp<TextStyle>
  testID?: string
  onPress?: () => void
}

const Text = memo<TxtT>(
  ({
    h,
    colors,
    title,
    oneColor = gray,
    numberOfLines,
    textStyle,
    testID = 'text',
    onPress,
    ...textProps
  }) => {
    const scheme = useColorScheme()
    const isDark = scheme === 'dark'

    let curColor = oneColor
    if (colors) {
      curColor = isDark ? colors.dark : colors.light
    }

    let hStyle: TextStyle | undefined
    if (h && textStyles[h]) {
      // @ts-ignore
      hStyle = { ...textStyles[h], color: curColor }
    }

    const mergedStyles: StyleProp<TextStyle> = StyleSheet.flatten([
      hStyle,
      textStyle,
    ])

    return (
      <RNText
        style={mergedStyles}
        {...textProps}
        testID={testID}
        ellipsizeMode="tail"
        numberOfLines={numberOfLines}
        onPress={onPress}
      >
        {title}
      </RNText>
    )
  },
)

export const textStyles = ScaledSheet.create({
  h0: {
    fontFamily: Platform.OS === 'ios' ? 'Etna' : 'etna-free-font',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: Platform.OS === 'ios' ? ms(95, 0.5) : ms(95, 0.3),
  },
  h1: {
    fontFamily: 'mont',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: Platform.OS === 'ios' ? ms(35, 0.3) : ms(35, 0.6),
    fontWeight: 'bold',
  },
  h2: {
    fontSize: Platform.OS === 'ios' ? s(20) : s(20),
    fontFamily: 'mont',
    fontWeight: 'bold',
  },
  h3: {
    fontFamily: 'mont',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: Platform.OS === 'ios' ? ms(18, 0.6) : ms(18, 0.6),
  },
  h4: {
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
    fontFamily: Platform.OS === 'ios' ? 'mont' : 'mont',
    lineHeight: 18,
  },
  h5: {
    fontFamily: 'mont',
    fontSize: Platform.OS === 'ios' ? ms(12, 0.8) : s(15),
  },
})

export { Text }
