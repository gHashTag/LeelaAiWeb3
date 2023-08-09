import React, { ReactNode } from 'react'
import { StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native'

interface BackgroundProps {
  children: ReactNode
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  const imageSource: ImageSourcePropType = require('../../../assets/images/background.png')

  return (
    <ImageBackground source={imageSource} style={styles.background}>
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
})

export { Background }
