import React, { ReactNode } from 'react'

import { ImageBackground, ImageSourcePropType } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { black, lightGray } from 'cons'
import { ScaledSheet } from 'react-native-size-matters'

interface BackgroundProps {
  children: ReactNode
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  const imageSource: ImageSourcePropType = require('../../../assets/images/background.png')

  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray
  return (
    <ImageBackground
      source={imageSource}
      style={[styles.background, { backgroundColor }]}
    >
      {children}
    </ImageBackground>
  )
}

const styles = ScaledSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
})

export { Background }
