import React, { ReactNode } from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { W, black, lightGray } from 'cons'

interface BackgroundProps {
  children: ReactNode
  isScrollView?: boolean
}

const Background: React.FC<BackgroundProps> = ({
  children,
  isScrollView = false,
}) => {
  // const imageSource: ImageSourcePropType = require('../../../assets/images/background.png')

  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray

  const backgroundStyle = [styles.background, { backgroundColor }]

  if (isScrollView) {
    return (
      // <ImageBackground source={imageSource} style={backgroundStyle}>
      <View style={backgroundStyle}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false} // Убираем индикатор скролла
        >
          {children}
        </ScrollView>
      </View>
      // </ImageBackground>
    )
  }

  return (
    // <ImageBackground source={imageSource} style={backgroundStyle}>
    <View style={backgroundStyle}>{children}</View>
    // </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
    width: W,
  },
})

export { Background }
