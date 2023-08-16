import React, { ReactNode } from 'react'

import { ImageBackground, ImageSourcePropType, ScrollView } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { W, black, lightGray } from 'cons'
import { ScaledSheet } from 'react-native-size-matters'

interface BackgroundProps {
  children: ReactNode
  isScrollView?: boolean
}

const Background: React.FC<BackgroundProps> = ({
  children,
  isScrollView = false,
}) => {
  const imageSource: ImageSourcePropType = require('../../../assets/images/background.png')

  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray

  const backgroundStyle = [styles.background, { backgroundColor }]

  if (isScrollView) {
    return (
      <ImageBackground source={imageSource} style={backgroundStyle}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false} // Убираем индикатор скролла
        >
          {children}
        </ScrollView>
      </ImageBackground>
    )
  }

  return (
    <ImageBackground source={imageSource} style={backgroundStyle}>
      {children}
    </ImageBackground>
  )
}

const styles = ScaledSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start', // Поднимаем контент вверх
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Поднимаем контент вверх
    alignItems: 'center',
    width: W,
  },
})

export { Background }
