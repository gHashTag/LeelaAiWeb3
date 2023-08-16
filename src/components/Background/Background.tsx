import React, { ReactNode } from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { Header, Space } from 'components'
import { W, black, lightGray } from 'cons'
import { useProfile } from 'hooks'
import { useRecoilState } from 'recoil'
import { account } from 'state'

interface BackgroundProps {
  children: ReactNode
  isScrollView?: boolean
  isShowHeader?: boolean
}

const Background: React.FC<BackgroundProps> = ({
  children,
  isScrollView = false,
  isShowHeader = true,
}) => {
  // const imageSource: ImageSourcePropType = require('../../../assets/images/background.png')
  const { profileData } = useProfile()
  const [rlyAccount] = useRecoilState(account)
  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray

  const backgroundStyle = [styles.background, { backgroundColor }]

  if (isScrollView) {
    return (
      // <ImageBackground source={imageSource} style={backgroundStyle}>
      <View style={backgroundStyle}>
        <Space height={60} />
        {rlyAccount && isShowHeader && <Header avatar={profileData.avatar} />}
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

    <View style={backgroundStyle}>
      <Space height={60} />
      {rlyAccount && isShowHeader && <Header avatar={profileData.avatar} />}
      {children}
    </View>
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
